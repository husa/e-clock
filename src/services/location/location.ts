type PositionOptions = {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
};

export type PositionErrorObject = {
  type: 'PositionError';
  message: string;
  error: GeolocationPositionError;
};

const positionOptions: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 5 * 1000, // 5 seconds
  maximumAge: 60 * 60 * 1000, // 1 hour
};

const TIMEOUT_INCREASE = 1000;

class Location {
  getPosition(customOptions: PositionOptions = positionOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { ...customOptions });
    }).then(
      position => position,
      positionError => {
        if (positionError.code === 3) {
          return this.getPosition({
            ...customOptions,
            timeout: customOptions.timeout + TIMEOUT_INCREASE,
          });
        }
        return Promise.reject({
          type: 'PositionError',
          message: 'Can not retrieve location',
          error: positionError,
        });
      },
    );
  }
}

export default Location;

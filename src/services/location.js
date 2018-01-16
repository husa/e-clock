const positionOptions = {
  enableHighAccuracy: true,
  timeout: 0, //5 * 1000, // 5 seconds
  maximumAge: 60 * 60 * 1000 // 1 hour
};

const TIMEOUT_INCREASE = 1000;

class Location {
  getPosition (options = positionOptions) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    }).then(
      position => position,
      positionError => {
        if (positionError.code === 3) {
          return this.getPosition({
            ...options,
            timeout: options.timeout + TIMEOUT_INCREASE
          });
        }
        return Promise.reject({
          type: 'PositionError',
          message: 'Can not retrieve location',
          error: positionError
        });
      }
    );
  }
}

const location = new Location;

export default location;

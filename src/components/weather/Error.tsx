import lang from '../../services/lang';
import ErrorMessage from '../error/ErrorMessage';

type Props = {
  error: {
    type: string;
    error: {
      code: number;
    };
  };
};

const WeatherError = ({ error }: Props) => {
  let message = lang.t('WeatherGeneralError');

  if (error.type === 'PositionError') {
    const { code } = error.error;
    switch (code) {
      case 1:
        message = lang.t('WeatherPositionErrorPermissionDenied');
        break;
      case 2:
        message = lang.t('WeatherPositionErrorPossitionUnavailable');
        break;
      case 3:
        message = lang.t('WeatherPositionErrorTimeout');
        message = 'timeout';
        break;
      default:
        message = lang.t('WeatherPositionErrorUnknownError');
    }
  }

  return <ErrorMessage className="weather__error">{message}</ErrorMessage>;
};

export default WeatherError;

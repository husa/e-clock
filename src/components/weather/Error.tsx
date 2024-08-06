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
  let message = lang.t('i18nWeatherGeneralError');

  if (error.type === 'PositionError') {
    const { code } = error.error;
    switch (code) {
      case 1:
        message = lang.t('i18nWeatherPositionErrorPermissionDenied');
        break;
      case 2:
        message = lang.t('i18nWeatherPositionErrorPossitionUnavailable');
        break;
      case 3:
        message = lang.t('i18nWeatherPositionErrorTimeout');
        message = 'timeout';
        break;
      default:
        message = lang.t('i18nWeatherPositionErrorUnknownError');
    }
  }

  return <ErrorMessage className="weather__error">{message}</ErrorMessage>;
};

export default WeatherError;

import {connect} from 'react-redux';

import {
  selectWeatherForecast
} from '../../selectors';

import WeatherForecast from '../../components/weather/Forecast';

const mapStateToProps = state => ({
  data: selectWeatherForecast(state)
});

export default connect(
  mapStateToProps
)(WeatherForecast);

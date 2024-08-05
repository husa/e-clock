import { connect } from 'react-redux';

import { selectLocation, selectCurrentWeather, selectSettings } from '../../__selectors';

import CurrentWeather from '../../components/weather/Current';

const mapStateToProps = (state) => ({
  data: selectCurrentWeather(state),
  location: selectLocation(state),
  temperatureUnits: selectSettings(state).temperatureUnits,
});

export default connect(mapStateToProps)(CurrentWeather);

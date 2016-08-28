import {connect} from 'react-redux';

import {getSettings} from '../../selectors';

import Clock from '../../components/clock/Clock';

const mapStateToProps = state => {
  const settings = getSettings(state);

  return {
    use24: settings.use24format,
    fontFamily: settings.fontFamily,
    fontSize: settings.fontSize,
    showDate: settings.displayDate,
    delimiterBlinking: settings.delimiterBlinking
  };
};

const ClockContainer = connect(
  mapStateToProps
)(Clock);

export default ClockContainer;

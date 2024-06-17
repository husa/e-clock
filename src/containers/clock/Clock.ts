import { connect } from 'react-redux';

import { selectSettings } from '../../selectors';

import Clock from '../../components/clock/Clock';

const mapStateToProps = state => {
  const settings = selectSettings(state);

  return {
    use24: settings.use24format,
    delimiterBlinking: settings.delimiterBlinking,
    displaySeconds: settings.displaySeconds,
    animateDigits: settings.animateDigits,
  };
};

const ClockContainer = connect(mapStateToProps)(Clock);

export default ClockContainer;

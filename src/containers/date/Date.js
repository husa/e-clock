import {connect} from 'react-redux';

import {selectSettings} from '../../selectors';

import DateView from '../../components/date/Date';

const mapStateToProps = state => {
  const settings = selectSettings(state);

  return {
    showDate: settings.displayDate
  };
};

export default connect(
  mapStateToProps
)(DateView);

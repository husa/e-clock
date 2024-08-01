import { connect } from 'react-redux';

import { selectSettings } from '../../selectors';

import { DocTitleUpdater } from '../../components/DocTitleUpdater/DocTitleUpdater';

const mapStateToProps = (state) => {
  const settings = selectSettings(state);

  return {
    use24: settings.use24format,
    displaySeconds: settings.displaySeconds,
  };
};

const DocTitleUpdaterContainer = connect(mapStateToProps)(DocTitleUpdater);

export default DocTitleUpdaterContainer;

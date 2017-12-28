import {connect} from 'react-redux';

import {selectSettings} from '../../selectors';

import {setIntro} from '../../actions/intro';

import Intro from '../../components/intro/Intro';


const mapStateToProps = state => ({
  settings: selectSettings(state)
});

const mapDispatchToProps = dispatch => ({
  setIntro (val) {
    return dispatch(setIntro(val));
  }
});

const IntroContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Intro);

export default IntroContainer;

import {connect} from 'react-redux';

import {getSettings} from '../../selectors';

import {setIntro} from '../../actions/intro';

import Intro from '../../components/intro/Intro';


const mapStateToProps = state => ({
  settings: getSettings(state)
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

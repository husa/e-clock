import './intro.styl';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import lang from '../../common/lang';

const INTRO_SHOW_TIME = 2000;

class Intro extends Component {

  componentDidMount () {
    setTimeout(() => {
      this.props.setIntro(false);
    }, INTRO_SHOW_TIME);
  }

  getStyle () {
    const {
      fontSize,
      fontFamily
    } = this.props.settings;

    return {
      fontFamily,
      fontSize: `${fontSize}em`
    };
  }

  render () {
    return (
      <div className="intro" style={this.getStyle()}>
        <div className="intro__message">
          {lang.t('Welcome')}
        </div>
      </div>
    );
  }
}

Intro.propTypes = {
  settings: PropTypes.object,
  setIntro: PropTypes.func
};

export default Intro;

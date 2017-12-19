import './app.styl';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FadeIn from '../../common/animations/FadeIn';

import Intro from '../../containers/intro/Intro';
import Clock from '../../containers/clock/Clock';
import Dock from '../../containers/dock/Dock';
import Settings from '../../containers/settings/Settings';
import Weather from '../../containers/weather/Weather';

class App extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      hidingIntro: false
    };
    this.timeout = null;
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.intro === true && nextProps.intro === false) {
      this.setState({hidingIntro: true});
      setTimeout(() => {
        this.setState({hidingIntro: false});
      }, 800);
    }
  }

  getBackground () {
    const {settings} = this.props;
    const priority = settings.backgroundPriority;

    switch (priority) {
      case 'color': {
        const background = settings.backgroundColor;
        return {background};
      }
      case 'gradient': {
        const angle = settings.backgroundGradientAngle;
        const colors = settings.backgroundGradient.split(',');
        const background = `linear-gradient(${angle}, ${colors[0]} 10%, ${colors[1]} 90%)`;
        return {background};
      }
      case 'pattern': {
        const pattern = settings.backgroundPattern;
        const backgroundImage = `url(img/patterns/${pattern}.png)`;
        return {backgroundImage};
      }
      case 'image': {
        const image = settings.backgroundImage;
        const backgroundImage = `url(img/backgrounds/${image}.jpg)`;
        return {backgroundImage};
      }
      case 'url': {
        const image = settings.backgroundImageUrl;
        const backgroundImage = `url(${image})`;
        return {backgroundImage};
      }
      default:
        return {};
    }
  }

  getStyle () {
    const {color} = this.props.settings;

    return Object.assign({
      color,
      fill: color
    }, this.getBackground());
  }

  getIntro () {
    let component;
    if (this.state.hidingIntro) {
      component = null;
    } else if (this.props.intro || this.state.hidingIntro) {
      component = (
        <Intro />
      );
    } else {
      component = [
        <Clock key="clock" />,
        <Weather key="weather" />
      ];
    }

    return (
      <FadeIn>
        {component}
      </FadeIn>
    );
  }

  render () {
    const style = this.getStyle();
    const className = classNames(
      'app',
      `app--${this.props.settings.backgroundPriority}`
    );
    return (
      <div id="app" style={style} className={className}>
        {this.getIntro()}

        <Dock />
        <Settings />
      </div>
    );
  }
}

App.propTypes = {
  settings: PropTypes.object,
  intro: PropTypes.bool
};

export default App;

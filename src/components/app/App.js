import './app.styl';

import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import FadeIn from '../../common/animations/FadeIn';

import Clock from '../../containers/clock/Clock';
import Dock from '../../containers/dock/Dock';
import Settings from '../../containers/settings/Settings';
import Weather from '../../containers/weather/Weather';

class App extends Component {

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

  render () {
    const style = this.getStyle();
    const className = classNames(
      'app',
      `app--${this.props.settings.backgroundPriority}`
    );

    return (
      <FadeIn>
        <div id="app" style={style} className={className}>
          <Clock />
          <Weather />
          <Dock />
          <Settings />
        </div>
      </FadeIn>
    );
  }
}

App.propTypes = {
  settings: PropTypes.object,
  intro: PropTypes.object
};

export default App;

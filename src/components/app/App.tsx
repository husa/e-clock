import './app.scss';

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';

// import FadeIn from '../../common/animations/FadeIn';

import { ISettings } from '../../types';
// import Intro from '../../containers/intro/Intro';
import Clock from '../../containers/clock/Clock';
import Date from '../../containers/date/Date';
import Dock from '../../containers/dock/Dock';
import DocTitleUpdater from '../../containers/docTitleUpdater/DocTitleUpdater';
import Settings from '../../containers/settings/Settings';
// import CurrentWeather from '../../containers/weather/Current';
// import WeatherForecast from '../../containers/weather/Forecast';
// import WeatherError from '../weather/Error';

const getStylesFromSettings = (settings: ISettings) => {
  const getBackground = (
    settings: ISettings,
  ): { background?: string; backgroundImage?: string } => {
    const priority = settings.backgroundPriority;

    switch (priority) {
      case 'color': {
        const background = settings.backgroundColor;
        return { background };
      }
      case 'gradient': {
        const angle = settings.backgroundGradientAngle;
        const colors = settings.backgroundGradient.split(',');
        const background = `linear-gradient(${angle}, ${colors[0]} 10%, ${colors[1]} 90%)`;
        return { background };
      }
      case 'pattern': {
        const pattern = settings.backgroundPattern;
        const backgroundImage = `url(img/patterns/${pattern}.png)`;
        return { backgroundImage };
      }
      case 'image': {
        const image = settings.backgroundImage;
        const backgroundImage = `url(img/backgrounds/${image}.jpg)`;
        return { backgroundImage };
      }
      case 'url': {
        const image = settings.backgroundImageUrl;
        const backgroundImage = `url(${image})`;
        return { backgroundImage };
      }
      default:
        return {};
    }
  };
  const getFontColor = (settings: ISettings): { color: string; fill: string } => {
    return {
      color: settings.color,
      fill: settings.color,
    };
  };

  return {
    ...getBackground(settings),
    ...getFontColor(settings),
  };
};

const getClockStyleFromSettings = (
  settings: ISettings,
): { fontFamily: string; fontSize: string } => {
  const { fontSize, fontFamily } = settings;
  return {
    fontFamily,
    fontSize: `${fontSize}rem`,
  };
};

type Props = {
  settings: ISettings;
};

const App = ({ settings }: Props) => {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const className = classNames('app', `app--${settings.backgroundPriority}`, {
    'app--settings-open': isSettingsOpen,
  });
  return (
    <div id='app' className={className}>
      <DocTitleUpdater />
      <div className='app__content' style={getStylesFromSettings(settings)}>
        <div className='app__clock-wrapper' style={getClockStyleFromSettings(settings)}>
          <Clock className='app__clock' />
          <Date className='app__date' />
        </div>

        <Dock className='app__dock' onSettingsClick={() => setSettingsOpen(!isSettingsOpen)} />
      </div>
      <Settings isOpen={isSettingsOpen} onCloseClick={() => setSettingsOpen(false)} />
    </div>
  );
};
// class App extends React.Component {
//   constructor(...args) {
//     super(...args);
//     this.state = {
//       hidingIntro: false,
//     };
//     this.timeout = null;
//   }
//
//   UNSAFE_componentWillReceiveProps(nextProps) {
//     if (this.props.intro === true && nextProps.intro === false) {
//       this.setState({ hidingIntro: true });
//       setTimeout(() => {
//         this.setState({ hidingIntro: false });
//       }, 800);
//     }
//   }
//
//   // getBackground() {
//   //   const { settings } = this.props;
//   //   const priority = settings.backgroundPriority;
//   //
//   //   switch (priority) {
//   //     case 'color': {
//   //       const background = settings.backgroundColor;
//   //       return { background };
//   //     }
//   //     case 'gradient': {
//   //       const angle = settings.backgroundGradientAngle;
//   //       const colors = settings.backgroundGradient.split(',');
//   //       const background = `linear-gradient(${angle}, ${colors[0]} 10%, ${colors[1]} 90%)`;
//   //       return { background };
//   //     }
//   //     case 'pattern': {
//   //       const pattern = settings.backgroundPattern;
//   //       const backgroundImage = `url(img/patterns/${pattern}.png)`;
//   //       return { backgroundImage };
//   //     }
//   //     case 'image': {
//   //       const image = settings.backgroundImage;
//   //       const backgroundImage = `url(img/backgrounds/${image}.jpg)`;
//   //       return { backgroundImage };
//   //     }
//   //     case 'url': {
//   //       const image = settings.backgroundImageUrl;
//   //       const backgroundImage = `url(${image})`;
//   //       return { backgroundImage };
//   //     }
//   //     default:
//   //       return {};
//   //   }
//   // }
//
//   // getStyle() {
//   //   const { color } = this.props.settings;
//   //
//   //   return Object.assign(
//   //     {
//   //       color,
//   //       fill: color,
//   //     },
//   //     this.getBackground(),
//   //   );
//   // }
//
//   getLayout() {
//     let component;
//     if (this.state.hidingIntro) {
//       component = null;
//     } else if (this.props.intro || this.state.hidingIntro) {
//       component = <Intro />;
//     } else {
//       component = this.getComponents();
//     }
//
//     return <FadeIn>{component}</FadeIn>;
//   }
//
//   getWeather(WeatherComponent, key, prefix = null) {
//     if (!this.props.settings.displayWeather) return null;
//     if (
//       !this.props.weather ||
//       (this.props.weather && this.props.weather.loading) ||
//       (this.props.weather && this.props.weather.error)
//     ) {
//       return null;
//     }
//     return [prefix, <WeatherComponent key={key} />];
//   }
//
//   getWeatherError() {
//     const { weather, settings } = this.props;
//     if (!settings.displayWeather) return null;
//     if (!weather || (weather && !weather.error)) return null;
//     return (
//       <div className='app__weather-error'>
//         <WeatherError error={weather.error} />
//       </div>
//     );
//   }
//
//   getComponents() {
//     const { fontSize, fontFamily, displayDate } = this.props.settings;
//     const style = {
//       fontFamily,
//       fontSize: `${fontSize}rem`,
//     };
//     return (
//       <div className='app__content' style={style}>
//         <div className='app__clock'>
//           <Clock />
//         </div>
//         <div className='app__current'>
//           <Date />
//           {this.getWeather(
//             CurrentWeather,
//             'current-weather',
//             displayDate ? (
//               <span className='separator' key='separator'>
//                 |
//               </span>
//             ) : null,
//           )}
//         </div>
//         <div className='app__weather'>
//           {this.getWeatherError()}
//           {this.getWeather(WeatherForecast, 'weather-forecast')}
//         </div>
//       </div>
//     );
//   }
//
//   render() {
//     const className = classNames('app', `app--${this.props.settings.backgroundPriority}`);
//     return (
//       <div id='app' className={className}>
//         <DocTitleUpdater />
//
//         <div className='app__content' style={getStylesFromSettings(this.props.settings)}>
//           <div className='app__' style={getClockStyleFromSettings(this.props.settings)}>
//             <Clock className='app__clock' />
//             <Date className='app__date' />
//           </div>
//
//           <Dock className='app__dock' />
//         </div>
//         <Settings />
//       </div>
//     );
//   }
// }
//
// App.propTypes = {
//   settings: PropTypes.object,
//   intro: PropTypes.bool,
// };

export default App;

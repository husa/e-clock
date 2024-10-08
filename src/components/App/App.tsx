import './App.scss';

import { useRef, useState } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Date from '../Date/Date';
import Dock from '../Dock/Dock';
import Settings from '../Settings/Settings';
import { SettingsState, useSettingsSlice } from '../../store/slices/settingsSlice';
import Clock from '../Clock/Clock';
import { DocTitleUpdater } from '../DocTitleUpdater/DocTitleUpdater';

const getStylesFromSettings = (settings: SettingsState) => {
  const getBackground = (
    settings: SettingsState,
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
        const backgroundImage = `url(/assets/img/patterns/${pattern}.png)`;
        return { backgroundImage };
      }
      case 'image': {
        const image = settings.backgroundImage;
        const backgroundImage = `url(/assets/img/backgrounds/${image}.jpg)`;
        return { backgroundImage };
      }
      case 'url': {
        const image = settings.backgroundImageUrl;
        const backgroundImage = `url(${image})`;
        return { backgroundImage };
      }
      default: {
        return {};
      }
    }
  };
  const getFontColor = (settings: SettingsState): { color: string; fill: string } => {
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
  settings: SettingsState,
): { fontFamily: string; fontSize: string } => {
  const { fontSize, fontFamily } = settings;
  const fallbackFont =
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
  return {
    fontFamily: `${fontFamily}, ${fallbackFont}`,
    fontSize: `${fontSize}rem`,
  };
};

const App = () => {
  const { state: settings } = useSettingsSlice();
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef(null);
  const className = classNames('app', `app--${settings.backgroundPriority}`, {
    'app--settings-open': isSettingsOpen,
  });
  return (
    <div id="app" className={className}>
      <DocTitleUpdater />
      <div className="app__content" style={getStylesFromSettings(settings)}>
        <div className="app__clock-wrapper" style={getClockStyleFromSettings(settings)}>
          <Clock className="app__clock" />
          <Date className="app__date" />
        </div>
        <Dock className="app__dock" onSettingsClick={() => setSettingsOpen(!isSettingsOpen)} />
      </div>
      <CSSTransition
        nodeRef={settingsRef}
        in={isSettingsOpen}
        timeout={300}
        classNames="app--settings-transition">
        <div ref={settingsRef} className="app__settings-container">
          <Settings onCloseClick={() => setSettingsOpen(false)} />
        </div>
      </CSSTransition>
    </div>
  );
};

export default App;

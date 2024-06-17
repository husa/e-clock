import './dock.scss';

import React from 'react';
import classNames from 'classnames';

import { dock } from '../../config';

import DockIcon from './DockIcon';

type Props = {
  dock: any;
  autoHide: boolean;
  toggleSettings: () => void;
};

const Dock = ({ dock: dockSettings, autoHide, toggleSettings }: Props) => {
  const className = classNames('dock', {
    'dock--autohide': autoHide,
  });

  return (
    <div className={className}>
      {dock
        .filter((d) => dockSettings[d.url] !== false)
        .map((dockItem) => (
          <DockIcon
            key={dockItem.url}
            isSettingsIcon={dockItem.url === 'settings'}
            {...dockItem}
            toggleSettings={toggleSettings}
          />
        ))}
    </div>
  );
};
export default Dock;

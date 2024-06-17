import './dock.scss';

import React from 'react';
import classNames from 'classnames';

import { dock } from '../../config';

import DockIcon from './DockIcon';

type Props = {
  className?: string;
  dock: any;
  autoHide: boolean;
  onSettingsClick: () => void;
};

const Dock = ({ className, dock: dockSettings, autoHide, onSettingsClick }: Props) => {
  const dockClassName = classNames('dock', className, {
    'dock--autohide': autoHide,
  });

  return (
    <div className={dockClassName}>
      {dock
        .filter(d => dockSettings[d.url] !== false)
        .map(dockItem => (
          <DockIcon
            key={dockItem.url}
            isSettingsIcon={dockItem.url === 'settings'}
            {...dockItem}
            toggleSettings={onSettingsClick}
          />
        ))}
    </div>
  );
};
export default Dock;

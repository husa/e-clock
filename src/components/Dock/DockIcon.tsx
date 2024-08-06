import './DockIcon.scss';

import React from 'react';
import classNames from 'classnames';

import lang from '../../services/lang';
import { I18nMessageKey } from '../../services/lang/providers/interface';

type Props = {
  className: string;
  url: string;
  text: I18nMessageKey;
  icon: string;
  iconViewbox?: string;
  isSettingsIcon?: boolean;
  toggleSettings: () => void;
};

const DockIcon = ({
  className,
  url,
  text,
  icon,
  iconViewbox,
  isSettingsIcon,
  toggleSettings,
}: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isSettingsIcon) {
      toggleSettings();
      return;
    }

    if (e.metaKey || e.ctrlKey || e.button === 1) {
      chrome.tabs.create({
        url,
        active: true,
      });
    } else {
      chrome.tabs.update({ url });
    }
  };

  const dockIconClassName = classNames('dock-icon', `dock-icon--${className}`);

  return (
    <li className={dockIconClassName} data-alt={lang.t(text)} onClick={handleClick}>
      <svg className="dock-icon__icon" viewBox={iconViewbox || '0 0 24 24'} width="24" height="24">
        <use xlinkHref={`#${icon}`}></use>
      </svg>
    </li>
  );
};

export default DockIcon;

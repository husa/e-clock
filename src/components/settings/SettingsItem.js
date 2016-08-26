import './settingsItem.styl';

import React from 'react';
import classNames from 'classnames';

export default function SettingsItem ({
  onClick,
  className,
  title,
  checked
}) {
  return (
    <div className={classNames('settings-item', className)} onClick={onClick}>
      <input
        className="settings-item__checkbox"
        type="checkbox"
        checked={checked}
        readOnly />
      <span className="settings-item__title">
        {title}
      </span>
    </div>
  );
}

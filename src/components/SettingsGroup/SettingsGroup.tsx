import './SettingsGroup.scss';

import React from 'react';
import classNames from 'classnames';

type Props = {
  title: string;
  icon: React.ReactElement;
  disabled?: boolean;
  onClick?: () => void;
};

const SettingsGroup = ({ title, icon, disabled, onClick }: Props) => {
  const className = classNames('settings-group', {
    'settings-group--disabled': disabled,
  });

  return (
    <div className={className} onClick={() => onClick()}>
      <div className='settings-group__icon'>{icon}</div>
      <div className='settings-group__title'>{title}</div>
    </div>
  );
};

export default SettingsGroup;

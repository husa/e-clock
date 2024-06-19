import './SettingsGroup.scss';

import React from 'react';
import classNames from 'classnames';

type Props = {
  title: string;
  icon: React.ReactElement;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const SettingsGroup = ({ className, title, icon, disabled, onClick }: Props) => {
  const containerClassName = classNames(className, 'settings-group', {
    'settings-group--disabled': disabled,
  });

  return (
    <div className={containerClassName} onClick={() => onClick && onClick()}>
      <div className='settings-group__icon'>{icon}</div>
      <div className='settings-group__title'>{title}</div>
    </div>
  );
};

export default SettingsGroup;

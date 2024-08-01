import './SettingsGroupTile.scss';

import classNames from 'classnames';

type Props = {
  title: string;
  icon: React.ReactElement;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const SettingsGroupTile = ({ className, title, icon, disabled, onClick }: Props) => {
  const containerClassName = classNames(className, 'settings-group-tile', {
    'settings-group-tile--disabled': disabled,
  });

  return (
    <div className={containerClassName} onClick={() => onClick?.()}>
      <div className="settings-group-tile__icon">{icon}</div>
      <div className="settings-group-tile__title">{title}</div>
    </div>
  );
};

export default SettingsGroupTile;

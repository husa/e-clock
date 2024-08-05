import './SettingsGroups.scss';

import classNames from 'classnames';
import SettingsGroupTile from '../SettingsGroupTile/SettingsGroupTile';
import type { SettingsGroup } from '../settings-groups';

type Props = {
  className?: string;
  groups: SettingsGroup[];
  onGroupSelect?: (n: number) => void;
};

const SettingsGroups = ({ className, groups, onGroupSelect }: Props) => {
  const containerClassName = classNames(className, 'settings-groups');
  return (
    <div className={containerClassName}>
      {groups.map((group, i) => (
        <SettingsGroupTile
          key={i}
          className="settings-groups__group"
          title={group.title}
          icon={group.icon}
          disabled={group.disabled}
          onClick={() => onGroupSelect(i)}
        />
      ))}
    </div>
  );
};

export default SettingsGroups;

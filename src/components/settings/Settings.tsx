import './Settings.scss';

import React, { useRef, useState } from 'react';
import classNames from 'classnames';

import SettingsGroups from './SettingsGroups/SettingsGroups';
import SettingsTitle from './SettingsTitle/SettingsTitle';
import { groups } from './settings-groups';
import lang from '../../services/lang';

type Props = {
  className?: string;
  onCloseClick: () => void;
};

const Settings = ({ className, onCloseClick }: Props) => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const title = selectedGroup === null ? lang.t('Settings') : lang.t(groups[selectedGroup].title);

  let selectedGroupPanel: React.ReactElement;
  if (selectedGroup === null) {
    selectedGroupPanel = <SettingsGroups groups={groups} onGroupSelect={setSelectedGroup} />;
  } else {
    const Component = groups[selectedGroup].component;
    selectedGroupPanel = Component ? <Component /> : null;
  }
  return (
    <div className={classNames('settings', className)}>
      <SettingsTitle
        showBackButton={selectedGroup !== null}
        onBackClick={() => setSelectedGroup(null)}
        onCloseClick={onCloseClick}>
        {title}
      </SettingsTitle>
      <div>{selectedGroupPanel}</div>
    </div>
  );
};

export default Settings;

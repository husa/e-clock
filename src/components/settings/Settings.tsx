import './Settings.scss';

import React, { useState } from 'react';
import classNames from 'classnames';

import SettingsGroups from './SettingsGroups/SettingsGroups';
import SettingsTitle from './SettingsTitle/SettingsTitle';
import { groups } from './settings-groups';
import lang from '../../services/lang';

type Props = {
  className?: string;
  isOpen: boolean;
  onCloseClick: () => void;
};

const Settings = ({ className, isOpen, onCloseClick }: Props) => {
  if (!isOpen) return null;
  const containerClassName = classNames('settings', className);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const title = selectedGroup === null ? lang.t('Settings') : lang.t(groups[selectedGroup].title);

  let selectedGroupPanel: React.ReactElement;
  if (selectedGroup === null) {
    selectedGroupPanel = (
      <SettingsGroups className="app__settings" groups={groups} onGroupSelect={setSelectedGroup} />
    );
  } else {
    const Component = groups[selectedGroup].component;
    selectedGroupPanel = Component ? <Component /> : null;
  }
  return (
    <div className={containerClassName}>
      <SettingsTitle
        showBackButton={selectedGroup !== null}
        onBackClick={() => setSelectedGroup(null)}
        onCloseClick={onCloseClick}>
        {title}
      </SettingsTitle>
      {selectedGroupPanel}
    </div>
  );
};

export default Settings;

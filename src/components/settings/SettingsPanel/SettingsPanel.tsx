import './SettingsPanel.scss';

import React from 'react';

type Props = {
  children: React.ReactNode;
};

const SettingsPanel = ({ children }: Props) => <div className='settings-panel'>{children}</div>;

export default SettingsPanel;

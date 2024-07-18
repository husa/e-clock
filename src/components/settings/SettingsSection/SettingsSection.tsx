import './SettingsSection.scss';
import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  title: string;
}>;

export const SettingsSection = ({ title, children }: Props) => {
  return (
    <div className="settings-section">
      <div className="settings-section__title">{title}</div>
      <div className="settings-section__options">{children}</div>
    </div>
  );
};

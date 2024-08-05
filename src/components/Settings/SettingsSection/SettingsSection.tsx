import './SettingsSection.scss';

import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  title: string;
  gridColumns?: number;
  gridGap?: number;
}>;

export const SettingsSection = ({ title, gridColumns = 8, gridGap = 4, children }: Props) => {
  return (
    <div className="settings-section">
      <div className="settings-section__title">{title}</div>
      <div
        className="settings-section__options"
        style={{
          gridGap: gridGap || 2,
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        }}>
        {children}
      </div>
    </div>
  );
};

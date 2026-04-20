import './SettingsSection.scss';

import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  title: string;
}>;

type GridProps = Props & {
  gridColumns?: number;
  gridGap?: number;
};

export const SettingsSection = ({ title, children }: Props) => {
  return (
    <div className="settings-section">
      <div className="settings-section__title">{title}</div>
      {children}
    </div>
  );
};

export const SettingsSectionGrid = ({
  title,
  gridColumns = 8,
  gridGap = 4,
  children,
}: GridProps) => {
  return (
    <SettingsSection title={title}>
      <div
        className="settings-section__options"
        style={{
          gridGap: gridGap || 2,
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        }}>
        {children}
      </div>
    </SettingsSection>
  );
};

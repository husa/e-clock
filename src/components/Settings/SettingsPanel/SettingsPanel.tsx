import './SettingsPanel.scss';

import classNames from 'classnames';

import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const SettingsPanel = ({ className, children }: Props) => (
  <div className={classNames(className, 'settings-panel')}>{children}</div>
);

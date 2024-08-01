import classNames from 'classnames';
import './SettingsPanel.scss';

import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const SettingsPanel = ({ className, children }: Props) => (
  <div className={classNames(className, 'settings-panel')}>{children}</div>
);

import './SwitchOption.scss';

import React, { PropsWithChildren } from 'react';
import Switch from '../Switch/Switch';

type Props = PropsWithChildren<{
  selected: boolean;
  onChange: () => void;
}>;

const SwitchOption = ({ selected, children, onChange }: Props) => {
  return (
    <div className="switch-option" onClick={() => onChange()}>
      <span className="switch-option__text">{children}</span>
      <Switch className="switch-option__switch" checked={selected} readOnly />
    </div>
  );
};

export default SwitchOption;

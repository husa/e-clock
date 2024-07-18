import './Switch.scss';

import React, { InputHTMLAttributes } from 'react';
import classNames from 'classnames';

const Switch = ({ className, checked, ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
  const wrapperClassName = classNames(
    'switch',
    {
      'switch--selected': checked,
      'switch--unselected': !checked,
    },
    className,
  );

  return (
    <div className={wrapperClassName}>
      <input className="switch__input" type="checkbox" role="switch" checked={checked} {...rest} />
      <div className="switch__track">
        <div className="switch__handle-container">
          <div className="switch__handle" />
        </div>
      </div>
    </div>
  );
};

export default Switch;

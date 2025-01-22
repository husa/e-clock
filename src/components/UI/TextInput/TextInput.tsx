import './TextInput.scss';

import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';

export const TextInput = ({
  className,
  placeholder,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label className="text-input">
      <input className={classNames(className, 'text-input__input')} type="text" {...rest} />
      <span className="text-input__label">{placeholder}</span>
    </label>
  );
};

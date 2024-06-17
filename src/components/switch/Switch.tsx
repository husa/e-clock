import './Switch.scss';

import React from 'react';
import classNames from 'classnames';

type Props = {
  selected: boolean;
  onChange: () => void;
};

const Switch = ({ selected, onChange }: Props) => {
  const className = classNames('switch', {
    'switch--selected': selected,
    'switch--unselected': !selected,
  });

  return (
    <div className={className}>
      <input
        className='switch__input'
        type='checkbox'
        role='switch'
        checked={selected}
        onChange={onChange}
      />
      <div className='switch__track'>
        <div className='switch__handle-container'>
          <div className='switch__handle' />
        </div>
      </div>
    </div>
  );
};

export default Switch;

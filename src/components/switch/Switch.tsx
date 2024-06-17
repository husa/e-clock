import './Switch.scss';

import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

type Props = {
  onChange: () => void;
};

const Switch = ({ onChange }: Props) => {
  const [selected, setSelected] = useState(false);
  const className = classNames('switch', {
    'switch--selected': selected,
    'switch--unselected': !selected,
  });

  const handleInputChange = useCallback(() => {
    setSelected(!selected);
  }, [selected]);

  return (
    <div className={className}>
      <input
        className='switch__input'
        type='checkbox'
        role='switch'
        checked={selected}
        onChange={handleInputChange}
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

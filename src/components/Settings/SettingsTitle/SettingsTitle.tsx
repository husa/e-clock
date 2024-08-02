import './SettingsTitle.scss';

import React from 'react';

type Props = {
  children: React.ReactNode;
  showBackButton?: boolean;
  onBackClick?: () => void;
  onCloseClick?: () => void;
};

const SettingsTitle = ({ children, showBackButton = true, onBackClick, onCloseClick }: Props) => (
  <div className='settings-title'>
    {showBackButton && (
      <button className='settings-title__button' onClick={onBackClick}>
        <svg height='24px' viewBox='0 -960 960 960' width='24px'>
          <path d='M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z' />
        </svg>
      </button>
    )}

    <h2 className='settings-title__title'>{children}</h2>

    <button className='settings-title__button' onClick={onCloseClick}>
      <svg height='24px' viewBox='0 -960 960 960' width='24px'>
        <path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
      </svg>
    </button>
  </div>
);

export default SettingsTitle;

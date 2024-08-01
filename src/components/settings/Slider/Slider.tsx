import './Slider.scss';

import React, { InputHTMLAttributes } from 'react';

export const Slider = ({ min, max, value, ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
  const zeroBasedValue: number = parseFloat(value as string) - parseFloat(min as string);
  const zeroBasedLength = parseFloat(max as string) - parseFloat(min as string);

  const left = (zeroBasedValue * 100) / zeroBasedLength;
  const right = 100 - left;

  return (
    <label className="slider">
      <input {...rest} className="slider__input" type="range" min={min} max={max} value={value} />

      <div className="slider__container">
        <div className="slider__track-left" style={{ flexBasis: left.toFixed(2) + '%' }}></div>
        <div className="slider__thumb"></div>
        <div className="slider__track-right" style={{ flexBasis: right.toFixed(2) + '%' }}></div>
      </div>
    </label>
  );
};

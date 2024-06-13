import './slide.scss';

import React from 'react';

import Animation from './Animation';

const Slide = ({ children }) => (
  <Animation name='slide' timeout={[0, 200, 200]}>
    {children}
  </Animation>
);

export default Slide;

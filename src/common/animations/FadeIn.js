import './fadeIn.styl';

import React from 'react';

import Animation from './Animation';

const FadeIn = ({children}) => (
  <Animation
    name="fadeIn"
    timeout={500}>
    {children}
  </Animation>
);

export default FadeIn;


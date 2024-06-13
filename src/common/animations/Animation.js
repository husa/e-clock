import React from 'react';
import { TransitionGroup } from 'react-transition-group';

const TRANSITION_DURATION = 500;

const Animation = ({ name, timeout, children }) => (
  <TransitionGroup
    transitionName={name}
    transitionAppear={true}
    transitionAppearTimeout={timeout[0] || TRANSITION_DURATION}
    transitionEnterTimeout={timeout[1] || TRANSITION_DURATION}
    transitionLeaveTimeout={timeout[2] || TRANSITION_DURATION}>
    {children}
  </TransitionGroup>
);

export default Animation;

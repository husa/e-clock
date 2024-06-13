import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

const TRANSITION_DURATION = 500;

console.log(CSSTransitionGroup);

const Animation = ({ name, timeout, children }) => (
  <CSSTransitionGroup
    transitionName={name}
    transitionAppear={true}
    transitionAppearTimeout={timeout[0] || TRANSITION_DURATION}
    transitionEnterTimeout={timeout[1] || TRANSITION_DURATION}
    transitionLeaveTimeout={timeout[2] || TRANSITION_DURATION}>
    {children}
  </CSSTransitionGroup>
);

export default Animation;

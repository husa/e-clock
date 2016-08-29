import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const TRANSITION_DURATION = 500;

const Animation = ({name, timeout, children}) => (

  <ReactCSSTransitionGroup
    transitionName={name}
    transitionAppear={true}
    transitionAppearTimeout={timeout || TRANSITION_DURATION}
    transitionEnterTimeout={timeout || TRANSITION_DURATION}
    transitionLeaveTimeout={timeout || TRANSITION_DURATION}>

      {children}

  </ReactCSSTransitionGroup>
);

export default Animation;


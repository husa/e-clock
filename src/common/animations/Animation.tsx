import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

const TRANSITION_DURATION = 500;

const Animation = ({ name, timeout, children }) => {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      classNames={name}
      //transitionAppear={true}
      appear={true}
      timeout={timeout || TRANSITION_DURATION}
      //transitionAppearTimeout={timeout[0] || TRANSITION_DURATION}
      //transitionEnterTimeout={timeout[1] || TRANSITION_DURATION}
      //transitionLeaveTimeout={timeout[2] || TRANSITION_DURATION}
    >
      <div ref={nodeRef}>{children}</div>
    </CSSTransition>
  );
};

export default Animation;

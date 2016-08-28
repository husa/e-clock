import './errorMessage.styl';

import React from 'react';
import classNames from 'classnames';

const ErrorMessage = ({className, children}) =>(
  <div className={classNames('error', className)}>
    <svg
      className="error__icon"
      height="24"
      viewBox="0 0 24 24"
      width="24">
      <use xlinkHref="#error"></use>
    </svg>
    <span className="error__message">
      {children}
    </span>
  </div>
);

export default ErrorMessage;

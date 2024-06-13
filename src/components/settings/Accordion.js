import './accordion.scss';

import React, { Component } from 'react';

class Accordion extends Component {
  render() {
    return <div className='accordion'>{this.props.children}</div>;
  }
}

export default Accordion;

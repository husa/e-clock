import './accordionPanel.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import autobind from 'autobindr';

class Panel extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      isOpen: false,
    };
    autobind(this);
  }

  onHeaderClick() {
    this.setState(state => ({ isOpen: !state.isOpen }));
  }

  render() {
    const { isOpen } = this.state;
    const className = classNames('accordion-panel', this.props.className);
    const contentClassName = classNames('accordion-panel__content', {
      'accordion-panel__content--open': isOpen,
    });
    const iconClassName = classNames('accordion-panel__header-icon', {
      'accordion-panel__header-icon--open': isOpen,
    });
    const contentStyle = {
      maxHeight: isOpen ? this.content.scrollHeight : 0,
    };

    return (
      <div className={className}>
        <div className='accordion-panel__header' onClick={this.onHeaderClick}>
          <svg className={iconClassName} viewBox='0 0 24 24' width='24' height='24'>
            <use xlinkHref='#chevron'></use>
          </svg>
          <span className='accordion-panel__header-title'>{this.props.header}</span>
        </div>
        <div
          className={contentClassName}
          style={contentStyle}
          ref={node => {
            this.content = node;
          }}>
          <div className='accordion-panel__content-wrapper'>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

Panel.propTypes = {
  className: PropTypes.string,
  header: PropTypes.string,
};

export default Panel;

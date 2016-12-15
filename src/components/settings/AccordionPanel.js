import './accordionPanel.styl';

import React, {Component} from 'react';
import classNames from 'classnames';

class Panel extends Component {

  constructor (...args) {
    super(...args);
    this.state = {
      isOpen: false
    };
    this.onHeaderClick = this.onHeaderClick.bind(this);
  }

  onHeaderClick () {
    this.setState({isOpen: !this.state.isOpen});
  }

  render () {
    const className = classNames(
      'accordion-panel',
      this.props.className
    );
    const contentClassName = classNames({
      'accordion-panel__content': true,
      'accordion-panel__content--open': this.state.isOpen
    });
    const iconClassName = classNames({
      'accordion-panel__header-icon': true,
      'accordion-panel__header-icon--open': this.state.isOpen
    });
    const contentStyle = {
      maxHeight: this.state.isOpen ? this.content.scrollHeight : 0
    };

    return (
      <div className={className}>
        <div className="accordion-panel__header" onClick={this.onHeaderClick}>
          <svg
            className={iconClassName}
            viewBox="0 0 24 24"
            width="24"
            height="24">
            <use xlinkHref="#chevron"></use>
          </svg>
          <span className="accordion-panel__header-title">
            {this.props.header}
          </span>
        </div>
        <div
          className={contentClassName}
          style={contentStyle}
          ref={c => {
            this.content = c;
          }}>
          <div className="accordion-panel__content-wrapper">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Panel.propTypes = {
  header: React.PropTypes.any
};

export default Panel;

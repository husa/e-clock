import './dock.styl';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {dock} from '../../config';

import DockIcon from './DockIcon';

class Dock extends Component {
  getDockItems () {
    return dock
      .filter(d => this.props.dock[d.url] !== false)
      .map(dockItem => (
        <DockIcon
          key={dockItem.url}
          isSettingsIcon={dockItem.url === 'settings'}
          {...dockItem}
          toggleSettings={this.props.toggleSettings} />
      ));
  }

  render () {
    const className = classNames('dock', {
      'dock--autohide': this.props.autoHide
    });

    return (
      <ul className={className}>
        {this.getDockItems()}
      </ul>
    );
  }
}

Dock.propTypes = {
  toggleSettings: PropTypes.func
};

export default Dock;

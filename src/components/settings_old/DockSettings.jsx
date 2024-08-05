import React, { Component } from 'react';
import PropTypes from 'prop-types';

import lang from '../../services/lang';
import SettingsItem from './SettingsItem';
import { dock } from '../../config';

class DockSettings extends Component {
  onSettingsItemClick(dockItem) {
    let val = this.props.dock[dockItem];
    if (typeof val === 'undefined') {
      val = false;
    } else {
      val = !val;
    }
    this.props.setDockOptions({
      [dockItem]: val,
    });
  }

  getDockSettingsItems() {
    return dock
      .slice(0)
      .reverse()
      .filter((i) => i.url !== 'settings')
      .map((dockItem) => (
        <SettingsItem
          key={dockItem.url}
          className={`settings-dock__${dockItem.className}`}
          title={lang.t(dockItem.text)}
          checked={this.props.dock[dockItem.url] !== false}
          onClick={this.onSettingsItemClick.bind(this, dockItem.url)}
        />
      ));
  }

  render() {
    return <div className='settings-dock'>{this.getDockSettingsItems()}</div>;
  }
}

DockSettings.propTypes = {
  dock: PropTypes.object,
  setDockOptions: PropTypes.func,
};

export default DockSettings;

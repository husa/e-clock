import './appearanceSettings.styl';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import lang from '../../services/lang';
import {
  colors,
  gradients,
  gradientAngles,
  patterns,
  images,
  fonts
} from '../../config';

import SettingsItem from './SettingsItem';
import Accordion from './Accordion';
import Panel from './AccordionPanel';

class AppearanceSettings extends Component {
  onOptionClick (options) {
    this.props.setOptions(options);
  }

  onSettingsItemClick (option) {
    this.onOptionClick({[option]: !this.props.settings[option]});
  }

  onBackgroundImageInputBlur (e) {
    const value = e.target.value;
    if (!value) return;
    this.props.setOptions({
      backgroundPriority: 'url',
      backgroundImageUrl: value
    });
  }

  getTextColorOptions () {
    const active = this.props.settings.color;

    return colors.map(color => {
      const className = classNames({
        'settings-appearance__color-option': true,
        'settings-appearance__color-option--active': active === color
      });
      return (
        <span
          key={color}
          className={className}
          style={{backgroundColor: color}}
          onClick={this.onOptionClick.bind(this, {
            color
          })}>
        </span>
      );
    });
  }

  getBackgroundColorOptions () {
    const active = this.props.settings.backgroundColor;

    return colors.map(color => {
      const className = classNames({
        'settings-appearance__bg-color-option': true,
        'settings-appearance__bg-color-option--active': active === color
      });
      return (
        <span
          key={color}
          className={className}
          style={{backgroundColor: color}}
          onClick={() => {
            this.onOptionClick({
              'backgroundColor': color,
              'backgroundPriority': 'color'
            });
          }}>
        </span>
      );
    });
  }

  getGradientOptions () {
    const active = this.props.settings.backgroundGradient;

    return gradients.map(gradient => {
      const className = classNames({
        'settings-appearance__bg-gradient-option': true,
        'settings-appearance__bg-gradient-option--active': active === gradient
      });
      const gc = gradient.split(',');
      const style = {
        background: `linear-gradient(90deg, ${gc[0]} 0%, ${gc[1]} 100%)`
      };
      return (
        <span
          key={gradient}
          className={className}
          style={style}
          onClick={() => {
            this.onOptionClick({
              'backgroundGradient': gradient,
              'backgroundPriority': 'gradient'
            });
          }}>
        </span>
      );
    });
  }

  getGradientAngleOptions () {
    const active = this.props.settings.backgroundGradientAngle;

    const angles = gradientAngles.map(angle => {
      const className = classNames({
        'settings-appearance__bg-gradient-angle-option': true,
        'settings-appearance__bg-gradient-angle-option--active': active === angle
      });
      const style = {
        transform: `rotate(${-90 + parseInt(angle, 10)}deg)`
      };
      return (
        <span
          key={angle}
          className={className}
          onClick={() => {
            this.onOptionClick({
              'backgroundGradientAngle': angle
            });
          }}>
          <svg
            className="settings-appearance__bg-gradient-angle-option-icon"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            style={style}>
            <use xlinkHref="#arrow"></use>
          </svg>
        </span>
      );
    });

    return (
      <div className="settings-appearance__bg-gradient-angle">
        <div className="settings-appearance__bg-gradient-angle-label">
          {lang.t('BackgroundGradientDirection')}
        </div>
        <div className="settings-appearance__bg-gradient-angle-options">
          {angles}
        </div>
      </div>
    );
  }

  getPatternOptions () {
    const active = this.props.settings.backgroundPattern;

    return patterns.map(pattern => {
      const className = classNames({
        'settings-appearance__bg-pattern-option': true,
        'settings-appearance__bg-pattern-option--active': active === pattern
      });
      return (
        <span
          key={pattern}
          className={className}
          style={{backgroundImage: `url(img/patterns/${pattern}.png)`}}
          onClick={() => {
            this.onOptionClick({
              'backgroundPattern': pattern,
              'backgroundPriority': 'pattern'
            });
          }}>
        </span>
      );
    });
  }

  getImageOptions () {
    const active = this.props.settings.backgroundImage;

    return images.map(image => {
      const className = classNames({
        'settings-appearance__bg-image-option': true,
        'settings-appearance__bg-image-option--active': active === image
      });
      return (
        <span
          key={image}
          className={className}
          style={{backgroundImage: `url(img/backgrounds/${image}.jpg)`}}
          onClick={() => {
            this.onOptionClick({
              'backgroundImage': image,
              'backgroundPriority': 'image'
            });
          }}>
        </span>
      );
    });
  }

  getCustomImageOptions () {
    let url = this.props.settings.backgroundImageUrl;

    return (
      <div className="settings-appearance__bg-url">
        <div className="text-input">
          <input
            className="text-input__input"
            type="text"
            defaultValue={url}
            onBlur={this.onBackgroundImageInputBlur.bind(this)}
            required />
          <span className="text-input__bar"></span>
          <span className="text-input__label">{lang.t('ImageUrl')}</span>
        </div>
      </div>
    );
  }

  getFontOptions () {
    const active = this.props.settings.fontFamily;

    return fonts.map(font => {
      const className = classNames({
        'settings-appearance__font-option': true,
        'settings-appearance__font-option--active': active === font
      });
      return (
        <span
          key={font}
          className={className}
          style={{fontFamily: font}}
          onClick={() => {
            this.onOptionClick({
              'fontFamily': font
            });
          }}>
          12345
        </span>
      );
    });
  }

  getFontSizeOptions () {
    const active = this.props.settings.fontSize;

    return (
      <div className="settings-appearance__font-size">
        <div className="settings-appearance__font-size-label">
          {lang.t('FontSize')}
        </div>
        <div className="settings-appearance__font-size-options">
          <input
            className="settings-font-size-item"
            type="range"
            min="4"
            max="25"
            defaultValue={active}
            step=".1"
            onChange={e => {
              const fontSize = e.target.value;
              this.onOptionClick({fontSize});
            }} />
        </div>
      </div>
    );
  }

  render () {
    return (
      <div className="settings-appearance">
        <SettingsItem
          className="settings-appearance__time-format"
          title={lang.t('24Format')}
          checked={this.props.settings.use24format}
          onClick={this.onSettingsItemClick.bind(this, 'use24format')} />

        <SettingsItem
          className="settings-appearance__display-seconds"
          title={lang.t('ShowSeconds')}
          checked={this.props.settings.displaySeconds}
          onClick={this.onSettingsItemClick.bind(this, 'displaySeconds')} />

        <SettingsItem
          className="settings-appearance__display-date"
          title={lang.t('ShowDate')}
          checked={this.props.settings.displayDate}
          onClick={this.onSettingsItemClick.bind(this, 'displayDate')} />

        <SettingsItem
          className="settings-appearance__delimiter-blinking"
          title={lang.t('DelimeterBlinking')}
          checked={this.props.settings.delimiterBlinking}
          onClick={this.onSettingsItemClick.bind(this, 'delimiterBlinking')} />

        <SettingsItem
          className="settings-appearance__animate-seconds"
          title={lang.t('AnimateDigits')}
          checked={this.props.settings.animateDigits}
          onClick={this.onSettingsItemClick.bind(this, 'animateDigits')} />

        <SettingsItem
          className="settings-appearance__autohide-dock"
          title={lang.t('AutoHideDock')}
          checked={this.props.settings.autoHideDock}
          onClick={this.onSettingsItemClick.bind(this, 'autoHideDock')} />

        <Accordion>

          <Panel
            header={lang.t('TextColor')}
            className="settings-appearance__color" >
            {this.getTextColorOptions()}
          </Panel>

          <Panel
            header={lang.t('BackgroundColor')}
            className="settings-appearance__bg-color" >
            {this.getBackgroundColorOptions()}
          </Panel>

          <Panel
            header={lang.t('BackgroundGradient')}
            className="settings-appearance__bg-gradient" >
            {this.getGradientOptions()}
            {this.getGradientAngleOptions()}
          </Panel>

          <Panel
            header={lang.t('BackgroundPattern')}
            className="settings-appearance__bg-pattern" >
            {this.getPatternOptions()}
          </Panel>

          <Panel
            header={lang.t('BackgroundImage')}
            className="settings-appearance__bg-image">
            {this.getImageOptions()}
          </Panel>

          <Panel
            header={lang.t('CustomImage')}
            className="settings-appearance__bg-custom-image">
            {this.getCustomImageOptions()}
          </Panel>

          <Panel
            header={lang.t('FontFamily')}
            className="settings-appearance__font">
            {this.getFontOptions()}
            {this.getFontSizeOptions()}
          </Panel>

        </Accordion>

      </div>
    );
  }
}

AppearanceSettings.propTypes = {
  settings: PropTypes.object,
  setOptions: PropTypes.func
};

export default AppearanceSettings;

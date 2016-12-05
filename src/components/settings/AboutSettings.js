/* eslint react/no-danger: 0 */
import './aboutSettings.styl';

import React, {Component} from 'react';

import lang from '../../common/lang';

class AboutSettings extends Component {
  render () {
    const manifest = chrome.runtime.getManifest();

    return (
      <div className="settings-about">
        <div className="settings-about__info-container">
          <h1 className="settings-about__title">
            {manifest.name}
          </h1>
          <div className="settings-about__version">
            {manifest.version}
          </div>
          <a href={`https://chrome.google.com/webstore/detail/${chrome.runtime.id}`} className="settings-about__like">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <use xlinkHref="#favorite"></use>
            </svg>
            <span>
              {lang.t('Rate')}
            </span>
          </a>
          <div className="settings-about__share">
            <a
              className="settings-about__share-link settings-about__share-link--twitter"
              href="https://twitter.com/intent/tweet/?text=Checkout%20e-clock%20-%20minimalistic%20chrome%20extension&url=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fe-clock%2Fojhhcfhabhligodffabdhcaoicecaboo&via=YuriyHusnay&hashtags=e-clock,chrome,extension"
              target="_blank">
              <svg width="24px" height="24px" viewBox="0 0 24 24">
                <use xlinkHref="#social-twitter"></use>
              </svg>
            </a>
            <a
              className="settings-about__share-link settings-about__share-link--facebook"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fe-clock%2Fojhhcfhabhligodffabdhcaoicecaboo"
              target="_blank">
              <svg width="24px" height="24px" viewBox="0 0 24 24">
                <use xlinkHref="#social-facebook"></use>
              </svg>
            </a>
            <a
              className="settings-about__share-link settings-about__share-link--google"
              href="https://plus.google.com/share?url=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fe-clock%2Fojhhcfhabhligodffabdhcaoicecaboo"
              target="_blank">
              <svg width="24px" height="24px" viewBox="0 0 24 24">
                <use xlinkHref="#social-google"></use>
              </svg>
            </a>
            <a
              className="settings-about__share-link settings-about__share-link--reddit"
              href="http://www.reddit.com/submit/?url=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fe-clock%2Fojhhcfhabhligodffabdhcaoicecaboo"
              target="_blank">
              <svg width="24px" height="24px" viewBox="0 0 24 24">
                <use xlinkHref="#social-reddit"></use>
              </svg>
            </a>
          </div>
        </div>
        <div className="settings-about__author-info">
          <p>
            <span>
              {lang.t('CreatedBy')}
            </span>
          </p>
          {/*
          <p>
            <span dangerouslySetInnerHTML={{__html: lang.t('OpenSource')}}></span>
          </p>
          */}
        </div>
      </div>
    );
  }
}

AboutSettings.propTypes = {};

export default AboutSettings;

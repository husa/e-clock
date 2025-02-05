import './SettingsPanelAbout.scss';
import { SettingsPanel } from '../SettingsPanel/SettingsPanel';
import lang from '../../../services/lang';
import { currentRuntime } from '../../../utils/currentRuntime';

export const SettingsPanelAbout = () => {
  const manifest = chrome.runtime.getManifest();
  const extentionId = chrome.runtime.id;
  const storeUrl =
    currentRuntime === 'chrome'
      ? `https://chrome.google.com/webstore/detail/${extentionId}`
      : `https://addons.mozilla.org/firefox/addon/${extentionId}`;

  return (
    <SettingsPanel className="settings-panel-about">
      <h1>{manifest.name}</h1>
      <h3>{manifest.version}</h3>
      <a href={storeUrl} className="settings-about__like">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <use xlinkHref="#favorite"></use>
        </svg>
        <span>{lang.t('i18nRate')}</span>
      </a>
    </SettingsPanel>
  );
};

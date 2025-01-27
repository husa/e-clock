import './SettingsPanelAbout.scss';
import { SettingsPanel } from '../SettingsPanel/SettingsPanel';
import lang from '../../../services/lang';
import { currentRuntime } from '../../../utils/currentRuntime';

// TODO: add link to Mozilla Add-ons
export const SettingsPanelAbout = () => {
  const manifest = chrome.runtime.getManifest();

  return (
    <SettingsPanel className="settings-panel-about">
      <h1>{manifest.name}</h1>
      <h3>{manifest.version}</h3>
      {currentRuntime === 'chrome' && (
        <a
          href={`https://chrome.google.com/webstore/detail/${chrome.runtime.id}`}
          className="settings-about__like">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <use xlinkHref="#favorite"></use>
          </svg>
          <span>{lang.t('i18nRate')}</span>
        </a>
      )}
    </SettingsPanel>
  );
};

import lang from '../../../services/lang';
import { dock } from '../../../config';
import { DockURL } from '../../../config/dock';
import { useDockSettingsSlice } from '../../../store/slices/dockSlice';
import SwitchOption from '../SwitchOption/SwitchOption';
import { SettingsPanel } from '../SettingsPanel/SettingsPanel';

export const SettingsPanelDock = () => {
  const { state: dockSettings, setDockOptions } = useDockSettingsSlice();

  const handleOptionChange = (dockItemUrl: DockURL) => {
    const currentValue = dockSettings[dockItemUrl];

    let nextValue: boolean;
    // if option has never been set
    if (typeof currentValue === 'undefined') {
      nextValue = false;
    } else {
      nextValue = !currentValue;
    }
    setDockOptions({
      [dockItemUrl]: nextValue,
    });
  };

  return (
    <SettingsPanel>
      {dock
        .slice(0)
        .reverse()
        .filter((i) => i.url !== 'settings')
        .map((dockItem) => (
          <SwitchOption
            key={dockItem.url}
            selected={dockSettings[dockItem.url] !== false}
            onChange={() => handleOptionChange(dockItem.url as DockURL)}>
            {lang.t(dockItem.text)}
          </SwitchOption>
        ))}
    </SettingsPanel>
  );
};

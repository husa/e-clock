import { useSettingsSlice } from '../../../store/slices/settingsSlice';
import { SettingsPanel } from '../SettingsPanel/SettingsPanel';
import SwitchOption from '../SwitchOption/SwitchOption';
import lang from '../../../services/lang';

export const SettingsPanelClock = () => {
  const { state, setSettingsOption } = useSettingsSlice();

  return (
    <SettingsPanel>
      <SwitchOption
        selected={state.use24format}
        onChange={() => setSettingsOption({ use24format: !state.use24format })}>
        {lang.t('i18n24Format')}
      </SwitchOption>
      <SwitchOption
        selected={state.displaySeconds}
        onChange={() => setSettingsOption({ displaySeconds: !state.displaySeconds })}>
        {lang.t('i18nShowSeconds')}
      </SwitchOption>
      <SwitchOption
        selected={state.displayDate}
        onChange={() => setSettingsOption({ displayDate: !state.displayDate })}>
        {lang.t('i18nShowDate')}
      </SwitchOption>
      <SwitchOption
        selected={state.animateDigits}
        onChange={() => setSettingsOption({ animateDigits: !state.animateDigits })}>
        {lang.t('i18nAnimateDigits')}
      </SwitchOption>
      <SwitchOption
        selected={state.delimiterBlinking}
        onChange={() => setSettingsOption({ delimiterBlinking: !state.delimiterBlinking })}>
        {lang.t('i18nDelimeterBlinking')}
      </SwitchOption>
    </SettingsPanel>
  );
};

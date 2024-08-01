import React from 'react';
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
        {lang.t('24Format')}
      </SwitchOption>
      <SwitchOption
        selected={state.displaySeconds}
        onChange={() => setSettingsOption({ displaySeconds: !state.displaySeconds })}>
        {lang.t('ShowSeconds')}
      </SwitchOption>
      <SwitchOption
        selected={state.displayDate}
        onChange={() => setSettingsOption({ displayDate: !state.displayDate })}>
        {lang.t('ShowDate')}
      </SwitchOption>
      <SwitchOption
        selected={state.animateDigits}
        onChange={() => setSettingsOption({ animateDigits: !state.animateDigits })}>
        {lang.t('AnimateDigits')}
      </SwitchOption>
      <SwitchOption
        selected={state.delimiterBlinking}
        onChange={() => setSettingsOption({ delimiterBlinking: !state.delimiterBlinking })}>
        {lang.t('DelimeterBlinking')}
      </SwitchOption>
    </SettingsPanel>
  );
};

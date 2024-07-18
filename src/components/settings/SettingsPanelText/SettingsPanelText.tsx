import './SettingsPanelText.scss';

import React from 'react';
import { colors } from '../../../config';
import lang from '../../../services/lang';
import { ColorPicker } from '../../ColorPicker/ColorPicker';
import { useSettingsSlice } from '../../../store/slices/settingsSlice';
import { SettingsSection } from '../SettingsSection/SettingsSection';

const ColorOption = ({ color }: { color: string }) => {
  return <div className="settings-text__color-option" style={{ backgroundColor: color }} />;
};

export const SettingsPanelText = () => {
  const { state, setSettingsOption } = useSettingsSlice();
  // text color
  // font
  // font size
  return (
    <div>
      <SettingsSection title={lang.t('TextColor')}>
        {colors.map((color) => (
          <ColorOption key={color} color={color} />
        ))}
        <ColorPicker
          value={state.color}
          onChange={(color) =>
            setSettingsOption({
              color,
            })
          }
        />
      </SettingsSection>
    </div>
  );
};

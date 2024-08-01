import React, { ChangeEvent } from 'react';
import { colors, fonts } from '../../../config';
import lang from '../../../services/lang';
import { ColorPicker } from '../../ColorPicker/ColorPicker';
import { useSettingsSlice } from '../../../store/slices/settingsSlice';
import { SettingsSection } from '../SettingsSection/SettingsSection';
import { SettingsPanel } from '../SettingsPanel/SettingsPanel';
import { Slider } from '../Slider/Slider';

export const SettingsPanelText = () => {
  const { state, setSettingsOption } = useSettingsSlice();

  return (
    <SettingsPanel>
      <SettingsSection title={lang.t('TextColor')}>
        {colors.map((color) => (
          <div
            key={color}
            style={{ backgroundColor: color }}
            onClick={() =>
              setSettingsOption({
                color,
              })
            }
          />
        ))}
        <ColorPicker
          className="settings-text__color-picker"
          value={state.color}
          onChange={(color) =>
            setSettingsOption({
              color,
            })
          }
        />
      </SettingsSection>
      <SettingsSection title={lang.t('FontFamily')} gridColumns={4}>
        {fonts.map((font) => (
          <div
            key={font}
            style={{ fontFamily: font, fontSize: '3em', overflow: 'hidden', lineHeight: '100%' }}
            onClick={() =>
              setSettingsOption({
                fontFamily: font,
              })
            }>
            12345
          </div>
        ))}
      </SettingsSection>
      <SettingsSection title={lang.t('FontSize')} gridColumns={1}>
        <Slider
          min="4"
          max="25"
          step="0.1"
          value={state.fontSize}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSettingsOption({
              fontSize: value,
            });
          }}
        />
      </SettingsSection>
    </SettingsPanel>
  );
};

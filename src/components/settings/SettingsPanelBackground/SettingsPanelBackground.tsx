import React from 'react';
import { colors, gradientAngles, gradients, images, patterns } from '../../../config';
import lang from '../../../services/lang';
import { ColorPicker } from '../../ColorPicker/ColorPicker';
import { SettingsState, useSettingsSlice } from '../../../store/slices/settingsSlice';
import { SettingsSection } from '../SettingsSection/SettingsSection';
import { SettingsPanel } from '../SettingsPanel/SettingsPanel';

export const SettingsPanelBackground = () => {
  const { state, setSettingsOption } = useSettingsSlice();

  const setOptionWithPriority =
    <T extends keyof SettingsState>(priority: SettingsState['backgroundPriority'], prop: T) =>
    (value: SettingsState[T]) =>
      setSettingsOption({
        backgroundPriority: priority,
        [prop]: value,
      });

  const setBackgroundColor = setOptionWithPriority('color', 'backgroundColor');
  const setBackgroundGradient = setOptionWithPriority('gradient', 'backgroundGradient');
  const setBackgroundPattern = setOptionWithPriority('pattern', 'backgroundPattern');
  const setBackgroundImage = setOptionWithPriority('image', 'backgroundImage');

  return (
    <SettingsPanel>
      {/* Color */}
      <SettingsSection title={lang.t('BackgroundColor')}>
        {colors.map((color) => (
          <div
            key={color}
            style={{ backgroundColor: color }}
            onClick={() => setBackgroundColor(color)}
          />
        ))}
        <ColorPicker
          value={state.backgroundColor || '#3e3e3e'}
          onChange={(color) => setBackgroundColor(color)}
        />
      </SettingsSection>

      {/* Gradient */}
      <SettingsSection title={lang.t('BackgroundGradient')}>
        {gradients.map((gradient) => {
          const gc = gradient.split(',');
          return (
            <div
              key={gradient}
              style={{
                background: `linear-gradient(90deg, ${gc[0]} 0%, ${gc[1]} 100%)`,
              }}
              onClick={() => setBackgroundGradient(gradient)}
            />
          );
        })}
        <ColorPicker
          value={state.backgroundGradient.split(',')[0]}
          onChange={(color) =>
            setBackgroundGradient(`${color},${state.backgroundGradient.split(',')[1]}`)
          }
        />
        <ColorPicker
          value={state.backgroundGradient.split(',')[1]}
          onChange={(color) =>
            setBackgroundGradient(`${state.backgroundGradient.split(',')[0]},${color}`)
          }
        />
      </SettingsSection>

      {/* Gradient Direction */}
      <SettingsSection title={lang.t('BackgroundGradientDirection')}>
        {gradientAngles.map((angle) => (
          <span
            key={angle}
            onClick={() => {
              setSettingsOption({
                backgroundGradientAngle: angle,
              });
            }}>
            <svg
              viewBox="0 0 24 24"
              width={24}
              height={24}
              style={{
                transform: `rotate(${-90 + parseInt(angle, 10)}deg)`,
              }}>
              <use xlinkHref="#arrow"></use>
            </svg>
          </span>
        ))}
      </SettingsSection>

      {/* Pattern */}
      <SettingsSection title={lang.t('BackgroundPattern')} gridColumns={4}>
        {patterns.map((pattern) => (
          <div
            key={pattern}
            style={{
              backgroundImage: `url(img/patterns/${pattern}.png)`,
              backgroundSize: 'cover',
            }}
            onClick={() => setBackgroundPattern(pattern)}
          />
        ))}
      </SettingsSection>

      {/* Image */}
      <SettingsSection title={lang.t('BackgroundPattern')} gridColumns={4}>
        {images.map((image) => (
          <div
            key={image}
            style={{
              backgroundImage: `url(img/backgrounds/${image}.jpg)`,
              backgroundSize: 'cover',
            }}
            onClick={() => setBackgroundImage(image)}
          />
        ))}
      </SettingsSection>
    </SettingsPanel>
  );
};

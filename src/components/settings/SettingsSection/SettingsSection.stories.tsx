import type { Meta, StoryObj } from '@storybook/react';

import { SettingsSection } from './SettingsSection';
import { colors } from '../../../config';

const meta: Meta<typeof SettingsSection> = {
  title: 'SettingsSection',
  component: SettingsSection,
  // ...
};
type Story = StoryObj<typeof SettingsSection>;

export const Primary: Story = {
  // ...
  render: () => {
    return (
      <div style={{ margin: '1rem', background: '#333', padding: '1rem', width: 304 }}>
        <SettingsSection title="Settings section" gridColumns={8} gridGap={4}>
          {colors.map((color) => (
            <div key={color} style={{ backgroundColor: color }} />
          ))}
        </SettingsSection>
      </div>
    );
  },
};

// export const Multiple: Story = {
//   // ...
//   render: () => {
//     return (
//       <div style={{ margin: '1rem', background: '#333', padding: '1rem' }}>
//         <SettingsSection title="Settings section">children</SettingsSection>
//         <SettingsSection title="Settings section">children</SettingsSection>
//         <SettingsSection title="Settings section">children</SettingsSection>
//         <SettingsSection title="Settings section">children</SettingsSection>
//         <SettingsSection title="Settings section">children</SettingsSection>
//         <SettingsSection title="Settings section">children</SettingsSection>
//         <SettingsSection title="Settings section">children</SettingsSection>
//       </div>
//     );
//   },
// };

export default meta;

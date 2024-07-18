import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SettingsSection } from './SettingsSection';

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
      <div style={{ margin: '1rem', background: '#333', padding: '1rem' }}>
        <SettingsSection title="Settings section">children</SettingsSection>
      </div>
    );
  },
};

export const Multiple: Story = {
  // ...
  render: () => {
    return (
      <div style={{ margin: '1rem', background: '#333', padding: '1rem' }}>
        <SettingsSection title="Settings section">children</SettingsSection>
        <SettingsSection title="Settings section">children</SettingsSection>
        <SettingsSection title="Settings section">children</SettingsSection>
        <SettingsSection title="Settings section">children</SettingsSection>
        <SettingsSection title="Settings section">children</SettingsSection>
        <SettingsSection title="Settings section">children</SettingsSection>
        <SettingsSection title="Settings section">children</SettingsSection>
      </div>
    );
  },
};

export default meta;

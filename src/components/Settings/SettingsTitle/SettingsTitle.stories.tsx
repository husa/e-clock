import type { Meta, StoryObj } from '@storybook/react';

import SettingsTitle from './SettingsTitle';

const meta: Meta<typeof SettingsTitle> = {
  title: 'SettingsTitle',
  component: SettingsTitle,
  // ...
};
type Story = StoryObj<typeof SettingsTitle>;

export const Primary: Story = {
  args: {
    children: 'Settings',
  },
};

export default meta;

import type { Meta, StoryObj } from '@storybook/react';

import SettingsGroups from './SettingsGroups';

const meta: Meta<typeof SettingsGroups> = {
  title: 'SettingsGroups',
  component: SettingsGroups,
  // ...
};
type Story = StoryObj<typeof SettingsGroups>;

export const Primary: Story = {};

export default meta;

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import SettingsGroups from './SettingsGroups';
import { groups } from '../settings-groups';

const meta: Meta<typeof SettingsGroups> = {
  title: 'SettingsGroups',
  component: SettingsGroups,
  // ...
};
type Story = StoryObj<typeof SettingsGroups>;

export const Primary: Story = {
  render: () => {
    return (
      <div style={{ width: 300 }}>
        <SettingsGroups groups={groups} />
      </div>
    );
  },
};

export default meta;

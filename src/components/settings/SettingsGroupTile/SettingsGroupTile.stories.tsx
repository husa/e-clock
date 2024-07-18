import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import SettingsGroupTile from './SettingsGroupTile';

const meta: Meta<typeof SettingsGroupTile> = {
  title: 'SettingsGroupTile',
  component: SettingsGroupTile,
  // ...
};
type Story = StoryObj<typeof SettingsGroupTile>;

export const Primary: Story = {
  args: {
    title: 'Storybook',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960'>
        <path d='m357-513 90-90-75-75-48 48-42-42 48-48-75-74-90 90 192 191Zm346 348 90-91-75-75-48 48-42-42 48-48-74-74-90 90 191 192Zm8-615 70 70-70-70ZM276-120H120v-156l194-194L80-704l174-176 236 235 178-178q9-9 20-13t22-4q11 0 22 4t20 13l71 71q9 9 13 20t4 22q0 11-4 22t-13 20L645-490l235 235L705-81 471-315 276-120Zm-96-60h70l393-394-70-70-393 394v70Zm428-429-35-35 70 70-35-35Z' />
      </svg>
    ),
  },
};
export const Disabled: Story = {
  args: {
    title: 'Storybook',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960'>
        <path d='m357-513 90-90-75-75-48 48-42-42 48-48-75-74-90 90 192 191Zm346 348 90-91-75-75-48 48-42-42 48-48-74-74-90 90 191 192Zm8-615 70 70-70-70ZM276-120H120v-156l194-194L80-704l174-176 236 235 178-178q9-9 20-13t22-4q11 0 22 4t20 13l71 71q9 9 13 20t4 22q0 11-4 22t-13 20L645-490l235 235L705-81 471-315 276-120Zm-96-60h70l393-394-70-70-393 394v70Zm428-429-35-35 70 70-35-35Z' />
      </svg>
    ),
    disabled: true,
  },
};

export default meta;

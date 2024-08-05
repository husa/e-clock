import type { Meta, StoryObj } from '@storybook/react';

import Settings from './Settings';

const meta: Meta<typeof Settings> = {
  title: 'Settings',
  component: Settings,
  // ...
};
type Story = StoryObj<typeof Settings>;

export const Primary: Story = {
  render: () => (
    <div style={{ width: 304, height: '100vh', padding: '24px 16px' }}>
      <Settings onCloseClick={() => {}} />
    </div>
  ),
};

export default meta;

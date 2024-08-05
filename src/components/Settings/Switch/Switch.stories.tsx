import type { Meta, StoryObj } from '@storybook/react';

import Switch from './Switch';
import { useState } from 'react';

const meta: Meta<typeof Switch> = {
  title: 'Switch',
  component: Switch,
  // ...
};
type Story = StoryObj<typeof Switch>;

export const Primary: Story = {
  // ...
  render: () => {
    const [switched, setSwitched] = useState(false);
    return <Switch checked={switched} onChange={() => setSwitched(!switched)}></Switch>;
  },
};
export default meta;

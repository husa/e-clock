import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import SwitchOption from './SwitchOption';
import { useState } from 'react';

const meta: Meta<typeof SwitchOption> = {
  title: 'SwitchOption',
  component: SwitchOption,
  // ...
};
type Story = StoryObj<typeof SwitchOption>;

export const Primary: Story = {
  // ...
  args: {
    children: 'Switch Option',
  },
  render: ({ children }) => {
    const [switched, setSwitched] = useState(false);
    return (
      <div style={{ width: '300px', padding: '16px', border: 'solid 1px rgba(255,255,255,.1)' }}>
        <SwitchOption selected={switched} onChange={() => setSwitched(!switched)}>
          {children}
        </SwitchOption>
      </div>
    );
  },
};

export const Multiple: Story = {
  // ...
  render: () => {
    const [switched, setSwitched] = useState(false);
    return (
      <div style={{ width: '300px', padding: '16px', border: 'solid 1px rgba(255,255,255,.1)' }}>
        <SwitchOption selected={switched} onChange={() => setSwitched(!switched)}>
          Switch Option
        </SwitchOption>
        <SwitchOption selected={switched} onChange={() => setSwitched(!switched)}>
          Switch Option
        </SwitchOption>
        <SwitchOption selected={switched} onChange={() => setSwitched(!switched)}>
          Switch Option
        </SwitchOption>
        <SwitchOption selected={switched} onChange={() => setSwitched(!switched)}>
          Switch Option
        </SwitchOption>
        <SwitchOption selected={switched} onChange={() => setSwitched(!switched)}>
          Switch Option
        </SwitchOption>
        <SwitchOption selected={switched} onChange={() => setSwitched(!switched)}>
          Switch Option
        </SwitchOption>
      </div>
    );
  },
};
export default meta;

import type { Meta, StoryObj } from '@storybook/react';

import { ColorPicker } from './ColorPicker';
import { useState } from 'react';

const meta: Meta<typeof ColorPicker> = {
  title: 'ColorPicker',
  component: ColorPicker,
  // ...
};
type Story = StoryObj<typeof ColorPicker>;

export const Primary: Story = {
  // ...
  render: () => {
    const [color, setColor] = useState('#000000');
    return <ColorPicker value={color} onChange={(color) => setColor(color)} />;
  },
};
export default meta;

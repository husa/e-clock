import { ChangeEvent, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Slider',
  component: Slider,
  // ...
};
type Story = StoryObj<typeof Slider>;

export const Primary: Story = {
  // ...
  render: () => {
    const [value, setValue] = useState<string>('10');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setValue(parseFloat(value).toFixed(1));
    };

    return <Slider min="4" max="25" step=".1" value={value} onChange={handleChange} />;
  },
};
export default meta;

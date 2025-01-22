import type { Meta, StoryObj } from '@storybook/react';

import { TextInput } from './TextInput';
import { useState } from 'react';

const meta: Meta<typeof TextInput> = {
  title: 'TextInput',
  component: TextInput,
  // ...
};
type Story = StoryObj<typeof TextInput>;

export const Primary: Story = {
  // ...
  render: () => {
    const [val, setVal] = useState(null);
    return (
      <div style={{ width: 350 }}>
        <TextInput
          value={val}
          placeholder="Custom Image URL"
          onChange={(e) => setVal(e.target.value)}
        />
      </div>
    );
  },
};
export default meta;

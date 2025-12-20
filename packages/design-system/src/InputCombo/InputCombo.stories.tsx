// THIS FILE IS GENERATED ONCE AND CAN BE EDITED MANUALLY
// You can add more stories, set up complex scenarios, and add controls for props from your component logic.

import type { Meta, StoryObj } from '@storybook/react';
import { InputCombo } from './InputCombo';

const meta: Meta<typeof InputCombo> = {
  title: 'Components/InputCombo',
  component: InputCombo,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['default'] },
    subtext: { control: 'text' },


  
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'default',
    subtext: 'Subtext',

  },
};

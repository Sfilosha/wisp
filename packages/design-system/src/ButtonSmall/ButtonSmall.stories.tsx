// THIS FILE IS GENERATED ONCE AND CAN BE EDITED MANUALLY
// You can add more stories, set up complex scenarios, and add controls for props from your component logic.

import type { Meta, StoryObj } from '@storybook/react';
import { ButtonSmall } from './ButtonSmall';

const meta: Meta<typeof ButtonSmall> = {
  title: 'Components/ButtonSmall',
  component: ButtonSmall,
  tags: ['autodocs'],
  argTypes: {

    value: { control: 'text' },
    hi: { control: 'text' },


  
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

    value: 'Button',
    hi: 'Hi',

  },
};

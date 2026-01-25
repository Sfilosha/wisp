// THIS FILE IS GENERATED ONCE AND CAN BE EDITED MANUALLY
// You can add more stories, set up complex scenarios, and add controls for props from your component logic.

import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {

    value: { control: 'text' },
    placeholder: { control: 'text' },

  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

    placeholder: 'Placeholder',
    value: '',

  },
};
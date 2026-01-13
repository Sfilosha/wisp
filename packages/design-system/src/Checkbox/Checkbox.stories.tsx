// THIS FILE IS GENERATED ONCE AND CAN BE EDITED MANUALLY
// You can add more stories, set up complex scenarios, and add controls for props from your component logic.

import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'select', options: ['True', 'False'] },



  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: 'True',


  },
};
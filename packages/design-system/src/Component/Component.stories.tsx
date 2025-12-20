// THIS FILE IS GENERATED ONCE AND CAN BE EDITED MANUALLY
// You can add more stories, set up complex scenarios, and add controls for props from your component logic.

import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Component',
  component: Component,
  tags: ['autodocs'],
  argTypes: {

    hello: { control: 'text' },
    title: { control: 'text' },


  
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

    hello: 'Hello',
    title: 'Title',

  },
};

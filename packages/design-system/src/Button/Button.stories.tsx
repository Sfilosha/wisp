// THIS FILE IS GENERATED ONCE AND CAN BE EDITED MANUALLY
// You can add more stories, set up complex scenarios, and add controls for props from your component logic.

import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    style: {
      control: "select",
      options: ["Link", "Tertiary", "Secondary", "Primary", "Error"],
    },
    size: { control: "select", options: ["small", "large", "medium"] },
    value: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: "Link",
    size: "small",
    value: "Button",
  },
};

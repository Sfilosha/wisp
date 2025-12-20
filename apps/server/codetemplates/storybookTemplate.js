export function storybookTemplate({componentName, variantArgTypes, valueArgTypes, placeholderArgTypes, booleanArgTypes, variantDefaultArgs, textDefaultArgs, booleanDefaultArgs}) {
    return `// THIS FILE IS GENERATED ONCE AND CAN BE EDITED MANUALLY
// You can add more stories, set up complex scenarios, and add controls for props from your component logic.

import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
  argTypes: {
${variantArgTypes}
${valueArgTypes}
${placeholderArgTypes}
${booleanArgTypes}
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
${variantDefaultArgs}
${textDefaultArgs}
${booleanDefaultArgs}
  },
};`
};
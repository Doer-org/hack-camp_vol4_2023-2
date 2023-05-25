import type { Meta, StoryObj } from "@storybook/react";

import { PopoverDemo } from "../components/popover";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof PopoverDemo> = {
  title: "Example/Popover",
  component: PopoverDemo,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PopoverDemo>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {},
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <PopoverDemo />
      </div>
    );
  },
};

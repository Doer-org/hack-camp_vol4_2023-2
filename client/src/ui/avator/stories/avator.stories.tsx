import type { Meta, StoryObj } from "@storybook/react";

import { Avator } from "../components/avator";

const meta: Meta<typeof Avator> = {
  title: "Example/Avator",
  component: Avator,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Avator>;

export const Aoki: Story = {
  render: () => {
    return (
      <Avator
        image="https://avatars.githubusercontent.com/u/55625375?v=4"
        size="small"
      />
    );
  },
};

export const Yasuda: Story = {
  render: () => {
    return (
      <Avator
        image="https://avatars.githubusercontent.com/u/86759515?v=4"
        size="medium"
      />
    );
  },
};

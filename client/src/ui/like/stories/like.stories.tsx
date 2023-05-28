import type { Meta, StoryObj } from "@storybook/react";

import { Like } from "../components";

const meta: Meta<typeof Like> = {
  title: "Hack/Like",
  component: Like,
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
type Story = StoryObj<typeof Like>;

export const Pink: Story = {
  render: () => {
    return <Like color="pink" />;
  },
};

export const Gray: Story = {
  render: () => {
    return <Like color="gray" />;
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import { Arrow } from "../components";

const meta: Meta<typeof Arrow> = {
  title: "Hack/Arrow",
  component: Arrow,
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
type Story = StoryObj<typeof Arrow>;

export const Default: Story = {
  render: () => {
    return <Arrow />;
  },
};

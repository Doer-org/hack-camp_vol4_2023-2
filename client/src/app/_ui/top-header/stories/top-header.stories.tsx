import type { Meta, StoryObj } from "@storybook/react";

import { TopHeader } from "../components";

const meta: Meta<typeof TopHeader> = {
  title: "Hack/Header/TopHeader",
  component: TopHeader,
  decorators: [
    (Story) => (
      <div
        style={{
          height: "100vh",
          background: "#f9f8f4",
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopHeader>;

export const Default: Story = {
  render: () => {
    return <TopHeader />;
  },
};

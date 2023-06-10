import type { Meta, StoryObj } from "@storybook/react";

import { Arrow, Button, Hamburger, Logo } from "@/ui";
import { CommonHeader } from "../components";

const meta: Meta<typeof CommonHeader> = {
  title: "Hack/Header/CommonHeader",
  component: CommonHeader,
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
type Story = StoryObj<typeof CommonHeader>;

export const Timeline: Story = {
  args: {
    title: "タイムライン",
    left: <Logo />,
    right: <Hamburger isOpen={true} />,
  },
};

export const Edit: Story = {
  args: {
    title: "編集",
    left: <Arrow />,
    right: (
      <Button color="black" size="small">
        更新
      </Button>
    ),
  },
};

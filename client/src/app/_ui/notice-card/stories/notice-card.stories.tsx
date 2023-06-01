import type { Meta, StoryObj } from "@storybook/react";

import { NoticeCard } from "../components";

const meta: Meta<typeof NoticeCard> = {
  title: "Hack/Card/NoticeCard",
  component: NoticeCard,
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
type Story = StoryObj<typeof NoticeCard>;

export const Aoki: Story = {
  args: {
    user: {
      name: "Aoki",
      icon: "https://avatars.githubusercontent.com/u/55625375?v=4",
    },
    action: "本プロフィールの内容を変更",
  },
};

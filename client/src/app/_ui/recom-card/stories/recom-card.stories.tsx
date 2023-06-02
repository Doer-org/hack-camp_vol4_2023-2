import type { Meta, StoryObj } from "@storybook/react";

import { RecomCard } from "../components";

const meta: Meta<typeof RecomCard> = {
  title: "Hack/Card/RecomCard",
  component: RecomCard,
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
type Story = StoryObj<typeof RecomCard>;

export const Default: Story = {
  args: {
    contentType: "person",
    contentName: "アーティスト",
    firstImage:
      "https://i.scdn.co/image/ab6761610000e5ebe18756b9265f7b53964157f2",
    secondImage:
      "https://i.scdn.co/image/ab6761610000e5eb9e41c9b34f4772baa492e86d",
    thirdImage:
      "https://i.scdn.co/image/ab67616d0000b273745ff8443f0db1cda32e5c97",
    manageActive: true,
  },
};

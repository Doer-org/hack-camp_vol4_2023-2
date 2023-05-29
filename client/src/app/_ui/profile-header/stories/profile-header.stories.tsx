import type { Meta, StoryObj } from "@storybook/react";

import { ProfileHeader } from "../components";

const meta: Meta<typeof ProfileHeader> = {
  title: "Hack/Header/ProfileHeader",
  component: ProfileHeader,
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
};

export default meta;
type Story = StoryObj<typeof ProfileHeader>;

export const Default: Story = {
  args: {
    user: {
      name: "Aoki",
      icon: "https://avatars.githubusercontent.com/u/55625375?v=4",
      me: true,
    },
  },
};

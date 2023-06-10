import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "../components/Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Hack/Avatar",
  component: Avatar,
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
type Story = StoryObj<typeof Avatar>;

export const Yuga: Story = {
  render: () => {
    return (
      <Avatar
        image="https://avatars.githubusercontent.com/u/113420384?v=4"
        size="tiny"
      />
    );
  },
};

export const Aoki: Story = {
  render: () => {
    return (
      <Avatar
        image="https://avatars.githubusercontent.com/u/55625375?v=4"
        size="small"
      />
    );
  },
};

export const Yasuda: Story = {
  render: () => {
    return (
      <Avatar
        image="https://avatars.githubusercontent.com/u/86759515?v=4"
        size="medium"
      />
    );
  },
};

export const Saki: Story = {
  render: () => {
    return (
      <Avatar
        image="https://avatars.githubusercontent.com/u/134147341?v=4"
        size="large"
      />
    );
  },
};

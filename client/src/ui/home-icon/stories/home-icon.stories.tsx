import type { Meta, StoryObj } from "@storybook/react";

import { HomeIcon } from "../components/home-icon";

const meta: Meta<typeof HomeIcon> = {
  title: "Hack/HomeIcon",
  component: HomeIcon,
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
type Story = StoryObj<typeof HomeIcon>;

export const Fill: Story = {
  render: () => {
    return <HomeIcon fill={true} />;
  },
};

export const Line: Story = {
  render: () => {
    return <HomeIcon fill={false} />;
  },
};

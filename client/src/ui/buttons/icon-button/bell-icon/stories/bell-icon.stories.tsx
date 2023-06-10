import type { Meta, StoryObj } from "@storybook/react";

import { BellIcon } from "../components/bell-icon";

const meta: Meta<typeof BellIcon> = {
  title: "Hack/BellIcon",
  component: BellIcon,
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
type Story = StoryObj<typeof BellIcon>;

export const Fill: Story = {
  render: () => {
    return <BellIcon fill={true} />;
  },
};

export const Line: Story = {
  render: () => {
    return <BellIcon fill={false} />;
  },
};

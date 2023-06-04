import type { Meta, StoryObj } from "@storybook/react";

import { Logo } from "../components/logo";

const meta: Meta<typeof Logo> = {
  title: "Hack/Logo",
  component: Logo,
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
type Story = StoryObj<typeof Logo>;

export const Small: Story = {
  render: () => {
    return <Logo />;
  },
};

export const Large: Story = {
  render: () => {
    return <Logo link={false} size="large" />;
  },
};

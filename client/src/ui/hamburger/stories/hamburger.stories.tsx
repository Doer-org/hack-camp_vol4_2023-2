import type { Meta, StoryObj } from "@storybook/react";

import { Hamburger } from "../components/";

const meta: Meta<typeof Hamburger> = {
  title: "Hack/Hamburger",
  component: Hamburger,
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
type Story = StoryObj<typeof Hamburger>;

export const Default: Story = {
  render: () => {
    return <Hamburger />;
  },
};

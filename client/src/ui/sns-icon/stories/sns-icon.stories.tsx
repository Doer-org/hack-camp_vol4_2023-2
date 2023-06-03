import type { Meta, StoryObj } from "@storybook/react";

import { SnsIcon } from "../components/";

const meta: Meta<typeof SnsIcon> = {
  title: "Hack/SnsIcon",
  component: SnsIcon,
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
type Story = StoryObj<typeof SnsIcon>;

export const Github: Story = {
  render: () => {
    return <SnsIcon sns="github" />;
  },
};

export const Twitter: Story = {
  render: () => {
    return <SnsIcon sns="twitter" />;
  },
};

export const Doer: Story = {
  render: () => {
    return <SnsIcon sns="doer" />;
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "../components/label";

const meta: Meta<typeof Label> = {
  title: "Hack/Label",
  component: Label,
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
type Story = StoryObj<typeof Label>;

export const New: Story = {
  render: () => {
    return <Label />;
  },
};

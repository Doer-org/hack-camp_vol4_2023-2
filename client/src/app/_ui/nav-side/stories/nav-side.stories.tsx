import type { Meta, StoryObj } from "@storybook/react";

import { NavSide } from "../components";

const meta: Meta<typeof NavSide> = {
  title: "Hack/NavSide",
  component: NavSide,
};

export default meta;
type Story = StoryObj<typeof NavSide>;

export const Default: Story = {
  args: {},
};

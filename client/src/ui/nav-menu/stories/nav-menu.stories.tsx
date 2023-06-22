import type { Meta, StoryObj } from "@storybook/react";

import { NavMenu } from "../components";

const meta: Meta<typeof NavMenu> = {
  title: "Hack/NavMenu",
  component: NavMenu,
};

export default meta;
type Story = StoryObj<typeof NavMenu>;

export const Default: Story = {
  args: {},
};

import type { Meta, StoryObj } from "@storybook/react";

import { NavFooter } from "../components/nav-footer";

const meta: Meta<typeof NavFooter> = {
  title: "Hack/Footer/NavFooter",
  component: NavFooter,
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
type Story = StoryObj<typeof NavFooter>;

export const Aoki: Story = {
  args: {
    icon: "https://avatars.githubusercontent.com/u/55625375?v=4",
  },
  argTypes: {
    active: { options: ["timeline", "profile", "notice", "other"] },
  },
};

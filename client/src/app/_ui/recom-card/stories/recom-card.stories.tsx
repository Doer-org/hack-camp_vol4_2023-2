import type { Meta, StoryObj } from "@storybook/react";

import { RecomCard } from "../components";
import { Arrow, Button, Hamburger, Logo } from "@/ui";

const meta: Meta<typeof RecomCard> = {
  title: "Hack/Card/RecomCard",
  component: RecomCard,
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
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof RecomCard>;

export const Default: Story = {};

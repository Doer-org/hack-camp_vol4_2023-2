import type { Meta, StoryObj } from "@storybook/react";

import { MemberCard } from "../components";

const meta: Meta<typeof MemberCard> = {
  title: "Hack/Card/MemberCard",
  component: MemberCard,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
type Story = StoryObj<typeof MemberCard>;

export const Yuga: Story = {
  render: () => {
    return (
      <MemberCard
        icon="https://avatars.githubusercontent.com/u/113420384?s=96&v=4"
        name="yuga"
        role="Frontend/ Design"
        github="yuuugaaa"
        twitter="____yuuugaaa"
      />
    );
  },
};

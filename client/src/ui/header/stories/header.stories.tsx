import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "../components";
import { Logo } from "@/ui/logo";
import { Hamburger } from "@/ui/hamburger";

const meta: Meta<typeof Header> = {
  title: "Hack/Header",
  component: Header,
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
type Story = StoryObj<typeof Header>;

export const Timeline: Story = {
  render: () => {
    return (
      <Header>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Logo size="small" />
          <b>タイムライン</b>
          <Hamburger />
        </div>
      </Header>
    );
  },
};

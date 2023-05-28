import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "../components";
import { Avator } from "@/ui/avator";
import { Button } from "@/ui/button";

const meta: Meta<typeof Card> = {
  title: "Hack/Card",
  component: Card,
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
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => {
    return <Card>Default</Card>;
  },
};

export const Aoki: Story = {
  render: () => {
    return (
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Avator
              image="https://avatars.githubusercontent.com/u/55625375?v=4"
              size="small"
            />
            <b>Aoki</b>
          </div>
          <Button color="black">フォロー中</Button>
        </div>
      </Card>
    );
  },
};

export const Saki: Story = {
  render: () => {
    return (
      <Card>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div style={{ flexShrink: "0" }}>
            <Avator
              image="https://avatars.githubusercontent.com/u/134147341?v=4"
              size="small"
            />
          </div>
          <div>
            <b>さき</b>さんがあなたの本プロフィールにいいね！しました
          </div>
        </div>
      </Card>
    );
  },
};

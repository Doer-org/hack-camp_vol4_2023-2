import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../components/button";

const meta: Meta<typeof Button> = {
  title: "Hack/Button",
  component: Button,
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
type Story = StoryObj<typeof Button>;

export const Black: Story = {
  render: () => {
    return <Button color="black">Log in</Button>;
  },
};

export const Gray: Story = {
  render: () => {
    return <Button color="gray">音楽</Button>;
  },
};

export const Pink: Story = {
  render: () => {
    return <Button color="pink">始める</Button>;
  },
};

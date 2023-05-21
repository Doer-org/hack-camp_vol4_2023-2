import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../components/button";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
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
    return (
      <Button
        variant="black"
        label="Log in"
      />
    );
  },
};

export const Gray: Story = {
  render: () => {
    return (
      <Button
        variant="gray"
        label="音楽"
      />
    );
  },
};

export const Pink: Story = {
  render: () => {
    return (
      <Button
        variant="pink"
        label="始める"
      />
    );
  },
};

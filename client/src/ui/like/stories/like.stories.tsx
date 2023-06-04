import type { Meta, StoryObj } from "@storybook/react";

import { Like } from "../components";
import { argumentsObjectFromField } from "@apollo/client/utilities";

const meta: Meta<typeof Like> = {
  title: "Hack/Like",
  component: Like,
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
type Story = StoryObj<typeof Like>;

export const Default: Story = {
  args: {
    user: {
      user_id: "guest",
      user_name: "Guest",
      image_url: "",
    },
  },
};

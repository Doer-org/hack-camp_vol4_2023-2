import type { Meta, StoryObj } from "@storybook/react";

import { SearchBar } from "../components/";

const meta: Meta<typeof SearchBar> = {
  title: "Hack/SearchBar",
  component: SearchBar,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#F9F8F4",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Music: Story = {
  render: () => {
    return <SearchBar contentType="music" />;
  },
};

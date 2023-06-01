import type { Meta, StoryObj } from "@storybook/react";

import { Ranking } from "../components";

const meta: Meta<typeof Ranking> = {
  title: "Hack/Ranking",
  component: Ranking,
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
type Story = StoryObj<typeof Ranking>;

export const Music: Story = {
  render: () => {
    return (
      <Ranking
        contentType="music"
        image="https://i.scdn.co/image/ab67616d00001e026bb2b8231817c8d205d07fb2"
        rank={1}
      />
    );
  },
};

export const Book: Story = {
  render: () => {
    return (
      <Ranking
        contentType="book"
        image="https://m.media-amazon.com/images/I/51xHT9ZnmNL._SX350_BO1,204,203,200_.jpg"
        rank={2}
      />
    );
  },
};

export const Person: Story = {
  render: () => {
    return (
      <Ranking
        contentType="person"
        image="https://i.scdn.co/image/ab67616100005174fbe071f5bc42f38d3485a29a"
        rank={3}
      />
    );
  },
};

export const NoRankNoImage: Story = {
  render: () => {
    return <Ranking contentType="music" />;
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import { SearchResult } from "../components";

const meta: Meta<typeof SearchResult> = {
  title: "Hack/SearchResult",
  component: SearchResult,
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
type Story = StoryObj<typeof SearchResult>;

export const Butter: Story = {
  render: () => {
    return (
      <SearchResult
        contentType="music"
        image="https://i.scdn.co/image/ab67616d000048516bb2b8231817c8d205d07fb2"
        text="Butter"
      />
    );
  },
};

export const Book: Story = {
  render: () => {
    return (
      <SearchResult
        contentType="book"
        image="https://m.media-amazon.com/images/I/51xHT9ZnmNL._SX350_BO1,204,203,200_.jpg"
        text="リーダブルコード"
      />
    );
  },
};

export const Person: Story = {
  render: () => {
    return (
      <SearchResult
        contentType="person"
        image="https://i.scdn.co/image/ab67616100005174fbe071f5bc42f38d3485a29a"
        text="YOASOBI"
      />
    );
  },
};

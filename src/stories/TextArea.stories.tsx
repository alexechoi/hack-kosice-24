import type { Meta, StoryObj } from "@storybook/react";

import { TextArea } from "../components/Common/TextArea/TextArea";

const meta: Meta<typeof TextArea> = {
    title: "Common/TextArea",
    component: TextArea,
};
type Story = StoryObj<typeof TextArea>;

export default meta;

export const Empty: Story = {};

export const WithLabel: Story = {
    args: {
        label: "Label",
    },
};

export const WithPlaceholder: Story = {
    args: {
        placeholder: "Placeholder",
    },
};

export const WithLabelAndPlaceholder: Story = {
    args: {
        label: "Label",
        placeholder: "Placeholder",
    },
};

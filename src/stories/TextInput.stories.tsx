import type { Meta, StoryObj } from "@storybook/react";

import { TextInput } from "../components/Common/TextInput/TextInput";

const meta: Meta<typeof TextInput> = {
    title: "Common/TextInput",
    component: TextInput,
};
type Story = StoryObj<typeof TextInput>;

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

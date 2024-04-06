import type { Meta, StoryObj } from "@storybook/react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

import { Button } from "../components/Common/Button/Button";

const meta: Meta<typeof Button> = {
    title: "Common/Button",
    component: Button,
};
type Story = StoryObj<typeof Button>;

export default meta;

export const Primary: Story = {
    args: {
        type: "primary",
        label: "Primary button",
    },
};

export const Secondary: Story = {
    args: {
        type: "secondary",
        label: "Secondary button",
    },
};

export const PrimaryWithIcon: Story = {
    args: {
        type: "primary",
        label: "Primary with icon",
        icon: MagnifyingGlassIcon,
    },
};

export const SecondaryWithIcon: Story = {
    args: {
        type: "secondary",
        label: "Secondary with icon",
        icon: MagnifyingGlassIcon,
    },
};

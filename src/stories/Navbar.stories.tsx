import type { Meta, StoryObj } from "@storybook/react";

import { Navbar } from "../components/Navbar/Navbar";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof Navbar> = {
    title: "Components/Navbar",
    component: Navbar,
    parameters: {
        viewport: {
            viewports: INITIAL_VIEWPORTS,
        },
    },
};
type Story = StoryObj<typeof Navbar>;

export default meta;

export const NavbarDesktop: Story = {
    decorators: [
        (Story) => (
            <div
                style={{
                    width: "1440px",
                    height: "1024px",
                    backgroundColor: "white",
                }}
            >
                <Story />
            </div>
        ),
    ],
};

export const NavbarMobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: "iphone14promax",
        },
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "white",
                }}
            >
                <Story />
            </div>
        ),
    ],
};

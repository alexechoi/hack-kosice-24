import type { Meta, StoryObj } from "@storybook/react";

import { PricingSection } from "../components/PricingSection/PricingSection.tsx";
import { priceOptionsData } from "./assets/priceOptions.ts";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof PricingSection> = {
    title: "Components/PricingSection",
    component: PricingSection,
    parameters: {
        viewport: {
            viewports: INITIAL_VIEWPORTS,
        },
    },
};
type Story = StoryObj<typeof PricingSection>;

export default meta;

export const PricingSectionDesktop: Story = {
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
    args: {
        options: priceOptionsData,
    },
};

export const PricingSectionMobile: Story = {
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
    args: {
        options: priceOptionsData,
    },
};

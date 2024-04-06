import type { Meta, StoryObj } from "@storybook/react";

import { ContactForm } from "../components/ContactForm/ContactForm.tsx";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof ContactForm> = {
    title: "Components/ContactForm",
    component: ContactForm,
    parameters: {
        viewport: {
            viewports: INITIAL_VIEWPORTS,
        },
    },
};
type Story = StoryObj<typeof ContactForm>;

export default meta;

export const ContactFormDesktop: Story = {
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

export const ContactFormMobile: Story = {
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

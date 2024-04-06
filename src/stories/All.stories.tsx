import type { Meta } from "@storybook/react";

const meta = {
    title: "All",
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta;

const Components = () => {
    return (
        <div>
            <h1>
                NOTE: You can use this story to render and test all your
                components here (i.e. for combinations, layouting, ...).
            </h1>
        </div>
    );
};

// Special story with all components
export const All = () => <Components />;
export default meta;

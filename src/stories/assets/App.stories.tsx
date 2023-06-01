import type {Meta, StoryObj} from '@storybook/react';
import App from "../../App";
import {ReduxStoreProviderDecorator} from "../decorators/ReduxStoreProviderDecorator";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof App> = {
    title: 'App',
    component: App,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof App>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AppReduxStory: Story = {
    render: () => <App />
};






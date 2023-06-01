import type {Meta, StoryObj} from '@storybook/react';
import Task from "../../todolist/Task";
import {TaskType} from "../../todolist/Todolist";
import {ReduxStoreProviderDecorator} from "../decorators/ReduxStoreProviderDecorator";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'Todolist/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        todolistId: '321',
        task: {id: '123', title: 'JS', isDone: false} as TaskType,
    },
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AppReduxStory: Story = {
    //render: () => <Provider store={store}><Task />  </Provider>
};

export const TaskIsDone: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        task: {id: '890', title: 'JSX', isDone: true} as TaskType,
    },
    //render: () => <Provider store={store}><Task />  </Provider>
};


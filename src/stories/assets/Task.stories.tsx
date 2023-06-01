import type {Meta, StoryObj} from '@storybook/react';
import Task from "../../todolist/Task";
import {TaskType} from "../../todolist/Todolist";
import {ReduxStoreProviderDecorator} from "../decorators/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'Todolist/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        todolistId: 'todolistId1',
        task: {id: '123', title: 'JS', isDone: false} as TaskType,
    },
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const TaskSt = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][1])
    return <Task task={task} todolistId={'todolistId1'}/>
}
export const TaskIsDone: Story = {
    render: () => <TaskSt />
};


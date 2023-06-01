import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {AddItemForm, AddItemFormPropsType} from "../../components/AddItemForm";
import React, {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            //action: 'clicked'
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemFormStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        addItem: action('Button clicked inside form')
    }
};

export const AddItemFormWithErrorStory = (args: AddItemFormPropsType) => {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args

        const [title, setTitle] = useState<string>('');
        const [error, setError] = useState<boolean>(true);

        const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
            error && setError(false);
            setTitle(e.currentTarget.value);
        }

        const addTask = () => {
            const trimmedTitle = title.trim();
            if (trimmedTitle) {
                args.addItem(trimmedTitle);
            } else {
                setError(true);
            }
            setTitle('')
        }

        const onKeyDownAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
            e.key === 'Enter' && addTask();
        }

        const buttonSettings = {
            maxWidth: '38px',
            maxHeight: '38px',
            minWidth: '38px',
            minHeight: '38px',
        }

        return <div>
            <TextField id="outlined-basic"
                       size='small'
                       value={title}
                       placeholder={'Please input title'}
                       onChange={changeLocalTitle}
                       onKeyDown={onKeyDownAddTask}
                       label={error ? "Title is required" : "Please type..."}
                       variant="outlined"
                       error={error} />
            <Button size="small"
                    variant="contained"
                    onClick={addTask}
                    style={buttonSettings} >
                +
            </Button>
        </div>
};


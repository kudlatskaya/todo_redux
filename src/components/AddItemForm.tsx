import React, {ChangeEvent, memo, useState} from "react";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

export type AddItemFormPropsType = {
    addItem: (title: string) => void,
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const maxLengthUserMessage: number = 15
    const isUserMessageToLong: boolean = title.length > maxLengthUserMessage

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onKeyDownAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTask()
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
                   error={error}
        />
        <Button size="small"
                variant="contained"
                onClick={addTask}
                style={buttonSettings}
        >
            +
        </Button>
    </div>
})
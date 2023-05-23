import React, {ChangeEvent, memo, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    todolistId: string,
    task: TaskType,
    removeTask: (taskId: string, todoListId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
    changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void,
}

const Task = memo(({todolistId, task, removeTask, changeTaskStatus, changeTaskTitle}: TaskPropsType) => {

    const removeTaskHandler = () => removeTask(task.id, todolistId);

    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
    };

    const onChangeTitleHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId)
    }, [changeTaskTitle, task.id])

    return (
        <li >
            <Checkbox checked={task.isDone} onChange={onChangeTaskStatusHandler} />

            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>

            <IconButton aria-label="delete" onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
});

export default Task;
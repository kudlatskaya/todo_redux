import React, {ChangeEvent, memo, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasksReducer";

export type TaskPropsType = {
    todolistId: string,
    task: TaskType,
}

const Task = memo(({todolistId, task}: TaskPropsType) => {

    const dispatch = useDispatch()

    const removeTaskHandler = () => dispatch(removeTaskAC(task.id, todolistId));

    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todolistId))
    };

    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistId))
    }, [dispatch, task.id, todolistId])

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
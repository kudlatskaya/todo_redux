import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "./Todolist";
import {EditableSpan} from "../components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from '@mui/material/Checkbox';
import Task from "./Task";

type TasksListPropsType = {
    todolistId: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string, todoListId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
    changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void,
}

const TasksList = (props: TasksListPropsType) => {

    const tasksItems = props.tasks.length
        ? props.tasks.map((t) => {
            return <Task key={t.id} todolistId={props.todolistId} task={t} removeTask={props.removeTask} changeTaskStatus={props.changeTaskStatus} changeTaskTitle={props.changeTaskTitle}/>
        })
        : <span>Your tasks list is empty</span>

    return (
        <div>
            {tasksItems}
        </div>
    );
};

export default TasksList;
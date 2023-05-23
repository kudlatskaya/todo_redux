import React, {memo, useCallback, useMemo} from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "../App";
import {AddItemForm} from "../components/AddItemForm";
import {EditableSpan} from "../components/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {removeTaskAC} from "../state/tasksReducer";

type TotoListPropsType = {
    todolistId: string,
    title: string,
    filter: FilterValuesType,
    tasks: Array<TaskType>,
    changeFilterValue: (filter: FilterValuesType, todoListId: string) => void,
    removeTask: (taskId: string, todoListId: string) => void,
    addTask: (title: string, todoListId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
    changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void,
    changeTodoListTitle: (todoListId: string, newValue: string) => void,
    removeTodoList: (todoListId: string) => void,
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

const TodoList = memo(({
                           todolistId,
                           title,
                           filter,
                           tasks,
                           changeFilterValue,
                           removeTask,
                           addTask,
                           changeTaskStatus,
                           changeTaskTitle,
                           changeTodoListTitle,
                           removeTodoList,
                       }: TotoListPropsType) => {

    const handlerCreator = (filter: FilterValuesType) => {
        return () => changeFilterValue(filter, todolistId)
    }

    const removeTodoListHandler = () => {
        removeTodoList(todolistId)
    }

    const setAllFilterValue = handlerCreator('all')
    const setActiveFilterValue = handlerCreator('active')
    const setCompletedFilterValue = handlerCreator('completed')

    const addTaskHandler = useCallback((title: string) => {
        addTask(title, todolistId);
    }, [addTask, todolistId])

    const onChangeTodoListTitleHandler = useCallback((newValue: string) => {
        changeTodoListTitle(todolistId, newValue)
    }, [changeTodoListTitle, todolistId])

    return (
        <div className={'todolist'}>
            <h3>
                <EditableSpan title={title} onChange={onChangeTodoListTitleHandler}/>

                <IconButton aria-label="delete" onClick={removeTodoListHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTaskHandler}/>

            <TasksList
                todolistId={todolistId}
                tasks={tasks}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
            />

            <div className={'filter-btn-container'}>
                <ButtonContainer title={'All'} variant={filter === 'all' ? 'outlined' : 'contained'}
                        color="success"
                        onClick={setAllFilterValue}/>

                <ButtonContainer title={'Active'} variant={filter === 'active' ? 'outlined' : 'contained'}
                        color="error"
                        onClick={setActiveFilterValue}/>

                <ButtonContainer title={'Completed'} variant={filter === 'completed' ? 'outlined' : 'contained'}
                        color="secondary"
                        onClick={setCompletedFilterValue}/>
            </div>
        </div>
    );
});

type ButtonContainerPropsType = {
    title: string,
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined,
    variant:  "text" | "outlined" | "contained" | undefined,
    onClick:  () => void,
}

const ButtonContainer = memo(({
                             title,
                             color,
                             variant,
                             onClick,
                         }: ButtonContainerPropsType) => {

    return <Button variant={variant}
                   color={color}
                   onClick={onClick}>
        {title}
    </Button>
})


export default TodoList;
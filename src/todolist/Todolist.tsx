import React, {memo, useCallback} from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "../App";
import {AddItemForm} from "../components/AddItemForm";
import {EditableSpan} from "../components/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

type TotoListPropsType = {
    id: string,
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
                      id,
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
        return () => changeFilterValue(filter, id)
    }

    const removeTodoListHandler = () => {
        removeTodoList(id)
    }

    const setAllFilterValue = handlerCreator('all')
    const setActiveFilterValue = handlerCreator('active')
    const setCompletedFilterValue = handlerCreator('completed')

    const addTaskHandler = useCallback((title: string) => {
        addTask(title, id);
    }, [addTask, id])

    const onChangeTodoListTitleHandler =useCallback((newValue: string) => {
        changeTodoListTitle(id, newValue)
    }, [changeTodoListTitle, id])

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
                id={id}
                tasks={tasks}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
            />

            <div className={'filter-btn-container'}>
                <Button variant={filter === 'all' ? 'outlined' : 'contained'}
                        color="success"
                        onClick={setAllFilterValue}>
                    All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'contained'}
                        color="error"
                        onClick={setActiveFilterValue}>
                    Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'contained'}
                        color="secondary"
                        onClick={setCompletedFilterValue}>
                    Completed
                </Button>
            </div>
        </div>
    );
});


export default TodoList;
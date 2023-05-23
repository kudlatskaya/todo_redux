import {useCallback} from 'react';
import './App.css';
import TodoList, {TaskType} from "./todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    addTodoListAC,
    changeTodoListFilterValueAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./state/todolistReducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

export type TasksStateType = {
    // [key type]: value type
    [key: string]: TaskType[],
}

function App() {
    //BLL:

    let todolists = useSelector<AppRootStateType, TodoListType[]>((state) => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)

    const dispatch = useDispatch()

    const removeTask = useCallback((taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, newIsDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, newIsDone, todoListId))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newValue: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, newValue, todoListId))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListId: string, newValue: string) => {
        dispatch(changeTodoListTitleAC(todoListId, newValue));
    }, [dispatch])

    const changeFilterValue = useCallback((filter: FilterValuesType, todoListId: string) => {
        dispatch(changeTodoListFilterValueAC(filter, todoListId));
    }, [dispatch])

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone);
            case 'completed':
                return tasks.filter(t => t.isDone);
            default:
                return tasks;
        }
    }

    const removeTodoList =  useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }, [dispatch])

    const addTodoList =  useCallback((title: string) => {
        dispatch(addTodoListAC(v1(), title))
    }, [dispatch])

//UI:
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <Grid container style={{padding:'20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((item, index) => {
                            return (
                                <Grid item key={index}>
                                    <Paper style={{padding:'10px'}} elevation={3}>
                                        <TodoList
                                            key={item.id}
                                            id={item.id}
                                            title={item.title}
                                            tasks={getFilteredTasks(tasks[item.id], item.filter)}
                                            filter={item.filter}
                                            changeFilterValue={changeFilterValue}
                                            removeTask={removeTask}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                            removeTodoList={removeTodoList}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;

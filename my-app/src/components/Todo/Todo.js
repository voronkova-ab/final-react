import React from 'react';
import TodoInput from '../TodoInput/TodoInput';
import TodoList from '../TodoList/TodoList';
import TodoFooter from '../TodoFooter/TodoFooter';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [
                {
                    text: 'Task 1',
                    id: 1,
                    isDone: false,
                    disabled: true,
                },
                {
                    text: 'Task 2',
                    id: 2,
                    isDone: false,
                    disabled: true,
                    
                },
                {
                    text: 'Task 3',
                    id: 3,
                    isDone: true,
                    disabled: true,
                },
                {
                    text: 'Task 4',
                    id: 4,
                    isDone: false,
                    disabled: true,
                },
                {
                    text: 'Task 5',
                    id: 5,
                    isDone: true,
                    disabled: true,
                },
                {
                    text: 'Task 6',
                    id: 6,
                    isDone: false,
                    disabled: true,
                },
                {
                    text: 'Task 7',
                    id: 7,
                    isDone: false,
                    disabled: true,
                },
                {
                    text: 'Task 8',
                    id: 8,
                    isDone: false,
                    disabled: true,
                },
                {
                    text: 'Task 9',
                    id: 9,
                    isDone: false,
                    disabled: true,
                },
                {
                    text: 'Task 10',
                    id: 10,
                    isDone: false,
                    disabled: true,
                },
                {
                    text: 'Task 11',
                    id: 11,
                    isDone: false,
                    disabled: true,
                },
                {
                    text: 'Task 12',
                    id: 12,
                    isDone: false,
                    disabled: true,
                }
            ],
            count: 12,
            activeFilter: 'Все',
            haveDone: true,
            footerValue: [
                {
                    name: 'Незавершенные',
                    isActive: false,
                    count: 1
                },
                {
                    name: 'Завершенные',
                    isActive: false,
                    count: 3
                },
                {
                    name: 'Все',
                    isActive: true,
                }
            ]
        };
        this.handleTodoItemDone = this.handleTodoItemDone.bind(this);
        this.handleTodoItemDelete = this.handleTodoItemDelete.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
        this.handleTodoDeleteAllComplete = this.handleTodoDeleteAllComplete.bind(this);
        this.changeFooterState = this.changeFooterState.bind(this);
        this.changeStateTask = this.changeStateTask.bind(this);
        this.handleChangeTask = this.handleChangeTask.bind(this);

    }

    changeStateTask(id) {
        const newTasks = this.state.tasks.map(task => {
            if (task.id === +id) {
                task.disabled = !task.disabled;
            }
            return task;
        });
        this.setState({tasks: newTasks});
    }

    handleChangeTask(id, value) {
        const newTasks = this.state.tasks.map(task => {
            if(task.id === +id) {
                task.text = value;
            }
            return task;
        });
        this.setState({tasks: newTasks});
    }

    onClickAdd(value) {
        let newTasks = [
        {
            text: value,
            id: this.state.count + 1,
            isDone: false,
            disabled: true
        }, 
        ...this.state.tasks
    ];

        this.setState((state) => ({
            count: state.count + 1,
            tasks: newTasks
        }));
    }

    handleTodoItemDone(id) {
        let newTasks = this.state.tasks.map(item => {
            if (item.id === +id) {
                item.isDone = !item.isDone;
            }
            return item;
        });

        this.setState({ 
            tasks: newTasks,
            haveDone: true
        });
        this.handleFooterFilter(this.state.activeFilter, id);
    }

    handleTodoItemDelete(id) {
        let newTasks = this.state.tasks.filter(item => item.id !== +id);
        this.setState({ tasks: newTasks });
    }

    handleTodoDeleteAllComplete() {
        let newTasks = this.state.tasks.filter(item => !item.isDone);
        if(this.state.tasks.length === newTasks.length) {
            this.setState({haveDone: false});
        } else {
            this.setState({ tasks: newTasks });
        }
    }

    handleFooterFilter(activeFilter, id) {
        const tasksList = [...document.querySelectorAll('li')];
        tasksList.forEach(item => item.style.display = '');

        if (id && activeFilter !== 'Все') {
            tasksList.filter(item => item.id === id)[0].style.display = 'none';
        }

        switch (activeFilter) {
            case 'Незавершенные':
                tasksList.filter(item => item.querySelector('span').classList.length === 2)
                    .forEach(item => item.style.display = 'none');
                break;
            case 'Завершенные':
                tasksList.filter(item => item.querySelector('span').classList.length === 1)
                    .forEach(item => item.style.display = 'none');
                break;
            default:
                break;
        }
    }

    changeFooterState(name) {
        let newFooterValue = this.state.footerValue.map(item => {
            if (item.name === name) {
                item.isActive = true;
            } else item.isActive = false;

            return item;
        });

        this.setState({
            footerValue: newFooterValue,
            activeFilter: name
        });
        this.handleFooterFilter(name);
    }


    render() {
        return (
            <React.Fragment>
                <TodoInput onClickAdd={this.onClickAdd} />
                <TodoList
                    onClickDone={this.handleTodoItemDone}
                    onClickDelete={this.handleTodoItemDelete}
                    onClickEdit={this.changeStateTask}
                    onChange={this.handleChangeTask}
                    tasks={this.state.tasks} 
                />
                <TodoFooter footerValue={this.state.footerValue}
                    countFooterInComplete={this.state.tasks.filter(i => !i.isDone).length}
                    countFooterComplete={this.state.tasks.filter(i => i.isDone).length}
                    onClickDelete={this.handleTodoDeleteAllComplete}
                    onClickItem={this.changeFooterState} haveDone={this.state.haveDone}
                />
            </React.Fragment>
        )
    }
}

export default Todo;
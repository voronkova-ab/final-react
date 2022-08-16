import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

const TodoList = ({ tasks, onClickDone, onClickDelete, onClickEdit, onChange }) => {

    return (
        <ul className={styles.list}>
            {tasks.map(item => (
                <TodoItem text={item.text} id={item.id} key={item.id} isDone={item.isDone} disabled={item.disabled}
                    onClickDone={onClickDone} onClickDelete={onClickDelete} onClickEdit={onClickEdit} onChange={onChange} />
            ))}
        </ul>
    );
};


export default TodoList;
import React from 'react';
import styles from './TodoItem.module.css';
import trash from './trash.svg';
import edit from './edit.svg';
import done from './done.png';
import classnames from 'classnames';

const TodoItem = ({ text, id, isDone, disabled, onClickDone, onClickDelete, onClickEdit, onChange }) => {
    const onClick = e => {
        const id = e.target.parentElement.id;

        if (e.target.alt === 'trash') {
            onClickDelete(id);
        } else if (e.target.alt === 'edit' || e.target.alt === 'done') {
            onClickEdit(id);

            if (e.target.alt === 'done') return;

            const input = e.target.parentElement.previousElementSibling;
            setTimeout(() => input.focus(), 0);
        } else onClickDone(id);
    };

    return (
        <li className={styles.item} id={id}>
            <span
                onClick={onClick}
                className={
                    classnames({
                        [styles.checkbox]: true,
                        [styles.checkbox_active]: isDone
                    })}></span>
            <input onChange={event => onChange(id, event.target.value)}
                id={id} type="text" value={text} disabled={disabled} autoComplete="off" className={
                    classnames({
                        [styles.text]: true,
                        [styles.textDone]: isDone,
                    })} />
            <div id={id}>
                {!isDone && (disabled ?
                    <img className={styles.btn} src={edit} alt="edit" onClick={onClick} /> :
                    <img className={classnames(styles.btn, styles.btnDone)} src={done} alt="done" onClick={onClick} />)}
                <img className={styles.btn} src={trash} alt="trash" onClick={onClick} />
            </div>
        </li>
    )
};

export default TodoItem;
import React from 'react';
import styles from './TodoFooter.module.css';
import classnames from 'classnames';


const TodoFooter = ({ footerValue, countFooterComplete, countFooterInComplete, onClickDelete, onClickItem, haveDone }) => {
    const renderCount = (name) => {
        if (name === 'Все') return null;
        else if (name === 'Завершенные') return countFooterComplete;
        else return countFooterInComplete;
    }
    return (
        <footer className={styles.footer}>
            <button className={styles.btnClean} onClick={onClickDelete}>
                Удалить все завершенные
            </button>
            {!haveDone && <p className={styles.error}>Завершите хоть одну задачу!</p>}
            <div className={styles.list} >
                {footerValue.map(item => (
                    <p className={
                        classnames({
                            [styles.item]: true,
                            [styles.itemActive]: item.isActive
                        })} onClick={() => onClickItem(item.name)}
                        key={item.name}>
                        {item.name} 
                        <span className={
                            classnames({
                                [styles.number]: true,
                                [styles.numberActive]: item.isActive
                        })}>{renderCount(item.name)}</span>
                    </p>
                ))}
            </div>
        </footer>
    )
};

export default TodoFooter;
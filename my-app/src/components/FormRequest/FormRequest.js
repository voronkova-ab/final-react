import React from 'react';
import styles from './FormRequest.module.css';
import search from './search.svg';
import classnames from 'classnames';

const FormRequest = ({ isError, onClickUpdateName, onChange, inputValue, showBtn }) => {
    return (
        <form className={styles.form}>
            <label htmlFor="name" className={styles.description}>Хотите сделать запрос о другом пользователе GitHub?</label>
            <div className={styles.wrap}>
                <input className={classnames({
                    [styles.input]: true,
                    [styles.inputError]: isError
                })} id="name" onChange={onChange} value={inputValue} type="text" placeholder={isError ? "Заполните поле!" : "Введите имя пользователя"} />
                <img src={search} className={
                    classnames({
                        [styles.btn]: true,
                        [styles.btn_active]: showBtn
                    })} alt="search" onClick={onClickUpdateName} />
            </div>
        </form>
    );
}

export default FormRequest;
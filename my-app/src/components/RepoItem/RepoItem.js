
import React from 'react';
import styles from './RepoItem.module.css';
import classnames from 'classnames';

const RepoItem = ({ urlProject, name, description, language, dateUpdate, gitHub }) => {
    const getFullDate = (date) => {
        const fullDate = new Date(Date.parse(date));
        return `Updated on ${fullDate.getDay()} ${fullDate.toLocaleString('en-us', { month: 'short' })} ${fullDate.getFullYear()}`;
    }

    const getFullUrlProject = (url) => {
        if (url !== null && (url.includes('https://') || url.includes('http://'))) {
            return url;
        } else if (url === null) {
            return gitHub;
        } else {
            return `https://${url}`;
        }
    }

    return (
        <li className={styles.listItem}>
            <div className={styles.info}>
                <a href={getFullUrlProject(urlProject)}
                    target="_blank" rel="noreferrer" className={styles.name}>
                    {name}
                </a>
                <p className={styles.description}>{description}</p>
                <p className={styles.date}>{getFullDate(dateUpdate)}</p>
            </div>
            {language && <p className={classnames({
                [styles.language]: true,
                [styles.languageJS]: language === 'JavaScript',
                [styles.languageCSS]: language === 'CSS'
            })}>
                {language}
            </p>}
        </li>
    );
}

export default RepoItem;
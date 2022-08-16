import React from 'react';
import RepoItem from '../RepoItem/RepoItem';
import styles from './RepoList.module.css';

const RepoList = ({ imgError, repos }) => {
    return (repos.length === 0 ?
        (<div className={styles.container}>
            <img className={styles.imgError} src={imgError} alt="error" />
            <p className={styles.title}>Добавьте как минимум один репозиторий на <a href="gitHub" target="_blank" rel="noreferrer">github.com</a></p>
        </div>) :
        (<ol className={styles.list}>
            {repos.map(repo => (
                <RepoItem key={repo.id} urlProject={repo.homepage} dateUpdate={repo.updated_at}
                    description={repo.description} name={repo.name} language={repo.language} gitHub={repo.html_url} />)
            )}
        </ol>)
    );
}

export default RepoList;

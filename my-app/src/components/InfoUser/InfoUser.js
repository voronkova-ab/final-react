import React from 'react';
import styles from './InfoUser.module.css';
import classnames from 'classnames';
import defaultAvatar from './avatar.png';

const InfoUser = ({ infoUser, login }) => {

    return (
        <section className={styles.container}>
            {
                infoUser.avatarUrl ?
                    <img className={styles.avatar} src={infoUser.avatarUrl} alt="avatar" /> :
                    <img className={styles.avatar} src={defaultAvatar} alt="defaultAvatar" />
            }
            <div className={styles.info}>
                <h1 className={styles.name}>{infoUser.name ? infoUser.name : login}</h1>
                <p className={styles.infoItem}>
                    {infoUser.bio}
                </p>
                <p className={classnames(styles.infoItem, styles.city)}>
                    {infoUser.city}
                </p>
                <a href={infoUser.urlGithub} className={classnames(styles.infoItem, styles.git)} target="_blank" rel="noreferrer">
                    {infoUser.urlGithub}
                </a>
            </div>
        </section>
    )
}

export default InfoUser;
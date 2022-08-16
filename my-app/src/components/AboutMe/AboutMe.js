import React, { useState, useEffect } from 'react';
import RepoList from '../RepoList/RepoList';
import InfoUser from '../InfoUser/InfoUser';
import FormRequest from '../FormRequest/FormRequest';
import imgPreloader from './preloader.gif';
import imgError from './error.jpg';
import styles from './AboutMe.module.css';
const AboutMe = () => {
    const initialState = {
        fetchUserName: 'voronkova-ab',
        repos: [],
        infoUser: {},
        isLoading: true,
        inputValue: '',
        isErrorInput: false,
        showBtn: false,
        isErrorFetch: false
    };

    const [fetchUserName, setFetchUserName] = useState(initialState.fetchUserName);
    const [isLoading, setIsLoading] = useState(initialState.isLoading);
    const [repos, setRepos] = useState(initialState.repos);
    const [infoUser, setInfoUser] = useState(initialState.infoUser);
    const [inputValue, setInputValue] = useState(initialState.inputValue);
    const [isErrorInput, setIsErrorInput] = useState(initialState.isErrorInput);
    const [showBtn, setShowBtn] = useState(initialState.showBtn);
    const [isErrorFetch, setIsErrorFetch] = useState(initialState.isErrorFetch);

    useEffect(() => {
        getInfoUser(fetchUserName);
        // eslint-disable-next-line
    }, []);

    const getInfoUser = (name) => {
        setIsLoading(true);
        setIsErrorFetch(false);

        fetch(`https://api.github.com/users/${name}`)
            .then(res => res.json())
            .then(json => {
                const newUser = {
                    avatarUrl: json.avatar_url,
                    name: json.name,
                    bio: json.bio,
                    urlGithub: json.html_url,
                    city: json.location

                };

                setInfoUser(newUser);
                return fetch(json.repos_url);
            }).then(res => res.json())
            .then(repos => {
                setRepos(repos);
                setIsLoading(false);
            }).catch(err => {
                setIsErrorFetch(true);
                setIsLoading(false);

                console.log(err);
            });
    };

    const handleInput = (e) => {
        setInputValue(e.target.value);
        setShowBtn(true);
    };

    const handleBtnUpdateName = () => {
        let newName = inputValue;
        setInputValue('');
        setShowBtn(false);

        // eslint-disable-next-line
        if (newName != false) {
            setFetchUserName(newName);
            getInfoUser(newName);
        } else {
            setIsErrorInput(true);
        }
    };

    const preloader = <div className={styles.container}>
        <img className={styles.imgPreloader} src={imgPreloader} alt="preloader" />
    </div>;
    const error = <div className={styles.container}>
        <img className={styles.imgError} src={imgError} alt="error" />
        <p className={styles.title}>Что-то пошло не так...</p>
        <FormRequest
            onClickUpdateName={handleBtnUpdateName} onChange={handleInput}
            showBtn={showBtn} inputValue={inputValue} />
    </div>;

    return (
        <React.Fragment>
            {isLoading ? preloader :
                (isErrorFetch ? error :
                    (<div>
                        <InfoUser infoUser={infoUser} login={fetchUserName} />
                        <RepoList imgError={imgError} repos={repos} />
                        <FormRequest isError={isErrorInput}
                            onClickUpdateName={handleBtnUpdateName} onChange={handleInput}
                            showBtn={showBtn} inputValue={inputValue} />
                    </div>))}
        </React.Fragment>
    );
};

export default AboutMe;
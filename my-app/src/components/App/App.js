import React, { useState } from 'react';
import Todo from '../Todo/Todo';
import AboutMe from '../AboutMe/AboutMe';
import "./Fonts/Fonts.css";
import styles from './App.module.css';
import classnames from 'classnames';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const App = () => {
  const initialState = {
    isActiveTodo: false,
    isActiveAboutMe: true
  }

  const [isActiveTodo, setTodo] = useState(initialState.isActiveTodo);
  const [isActiveAboutMe, setAboutMe] = useState(initialState.isActiveAboutMe);

  const handleLink = (e) => {
    if (e.target.textContent === 'Список дел' && isActiveTodo === true) {
      return;
    } else if (e.target.textContent === 'Обо мне' && isActiveAboutMe === true) {
      return;
    } else {
      setTodo(!isActiveTodo);
      setAboutMe(!isActiveAboutMe);
    }

  }

  return (
    <Router>
      <div className={styles.wrap}>
        <nav className={styles.nav}>
          <Link to='/todo' className={
            classnames({
              [styles.item]: true,
              [styles.itemActive]: isActiveTodo
            })} onClick={handleLink}>
            Список дел
          </Link>
          <Link to="/" className={
            classnames({
              [styles.item]: true,
              [styles.itemActive]: isActiveAboutMe
            })} onClick={handleLink}>
            Обо мне
          </Link>
        </nav>
        <div className={styles.content}>
          <Routes>
            <Route path='/todo' element={<Todo />} />
            <Route path='/' exact element={<AboutMe />} />
          </Routes>
        </div>
      </div>
    </Router>

  )
};

export default App;
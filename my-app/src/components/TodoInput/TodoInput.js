import React from 'react';
import styles from './TodoInput.module.css';
import classnames from 'classnames';



class TodoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isChange: false,
      isError: false,
      isRepeat: false
    }
    this.onClickBtn = this.onClickBtn.bind(this);
  }
  onClickBtn(e) {
    e.preventDefault();
    let tasks = document.querySelectorAll('li input');
    this.setState({
      value: '',
      isChange: false,
      isError: false,
      isRepeat: false
    });

    // eslint-disable-next-line
    if (this.state.value == false) {
      this.setState({
        isError: true
      });
      return;
    }
    if(Array.from(tasks).filter(item => this.state.value === item.value).length !== 0) {
      this.setState({
        isRepeat: true,
        isError: true
      });
      console.log('11');
      return;
    }
    this.props.onClickAdd(this.state.value);
  }

  render() {
    const {isError, isRepeat } = this.state;
    return (
      <form className={styles.form}>
        {isError && <p className={styles.error}>
          {isRepeat ? 
            'Такая задача уже есть в вашем списке. Введите другое название ' : 
            'Задача должна состоять хотя бы из одного символа!'}
            </p>}
        <input onChange={event => this.setState({
          value: event.target.value,
          isChange: true
        })}
          className={styles.input} type="text" value={this.state.value} placeholder="Введите, пожалуйста, новую задачу" />
        <button onClick={this.onClickBtn}
          className={classnames({
            [styles.btn]: true,
            [styles.btnDone]: this.state.isChange
          })}></button>
      </form>
    )
  }
}

export default TodoInput;
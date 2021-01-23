import React, { Component } from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
// библиотека для валидации форм
import is from 'is_js'
import axios from 'axios'

// function validateEmail(email) {
//   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//   return re.test(String(email).toLowerCase())
// }

export default class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите коректный email',
        valid: false,
        // был ли затронут инпут
        touched: false,
        // правило по котором мы будем валидировать данный контрол
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите коректный пароль',
        valid: false,
        // был ли затронут инпут
        touched: false,
        // правило по котором мы будем валидировать данный контрол
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  }

  loginHandler = async () => {
    // при регистрации методом post нужно передавать три параметра согласно документации
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    }
    try {
      const response = await axios.post(
        // api регистрации нового пользователя firebase берем на сайте
        // api key приложения берем на сайте
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBnoLbZeqZ5xXwvDtTPNVQ_6XiwD_rCdBE',
        authData
      )
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  registerHandler = async () => {
    // при регистрации методом post нужно передавать три параметра согласно документации
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    }
    try {
      const response = await axios.post(
        // api регистрации нового пользователя firebase берем на сайте
        // api key приложения берем на сайте
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBnoLbZeqZ5xXwvDtTPNVQ_6XiwD_rCdBE',
        authData
      )
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  submitHandler = (e) => {
    e.preventDefault()
  }

  renderInputs() {
    // пробежали по обьекту formControls получили массив ключей, по которому идем map
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  // проверяет валидный ли контрол
  validateControl(value, validation) {
    // если не получили параметр то валидировать нечего
    if (!validation) {
      return true
    }
    // дальше будем переопределять переменную isValid в зависимости от соответчтвия обьекту конфигурации validation
    let isValid = true
    if (validation.required) {
      // остаеться true если value не равно пустой строке
      isValid = value.trim() !== '' && isValid
    }
    if (validation.email) {
      isValid = is.email(value) && isValid
    }
    if (validation.minLength) {
      // если value больше или равно длинны указаной в валидаци то true
      isValid = value.length >= validation.minLength && isValid
    }
    return isValid
  }
  //валидирует все поля формы
  onChangeHandler = (event, controlName) => {
    //копируем обьект формКонтрол чтоб не было мутации
    const formControls = { ...this.state.formControls }
    // копия обьекта нужного контрола
    const control = { ...formControls[controlName] }
    // изменяем значение с инпута
    control.value = event.target.value
    // как только мы попали в инпут меняем флаг
    control.touched = true
    // проверяем валидность инпута с помощью локальной функции куда передадим value и обьект конфигурации
    control.valid = this.validateControl(control.value, control.validation)
    // изменяем копию обьекта
    formControls[controlName] = control

    // проверяем валидацию всей формы
    let isFormValid = true

    //проверяем валидность контрола, получаем ключи, пробегаем цыклом смотрим поле valid каждого контрола
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid
    })

    //  изменяем state
    this.setState({
      formControls,
      isFormValid,
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Войти
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

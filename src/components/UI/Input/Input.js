import React from 'react'
import classes from './Input.module.css'

// проверяет валидацию контролов
function isInvalid({ valid, touched, shouldValidate }) {
  // если контрол не валидированный и если мы должны его валидировать и если мы его потрогали то это означает что он у нас уже не валидный
  return !valid && shouldValidate && touched
}

const Input = (props) => {
  const inputType = props.type || 'text'
  const cls = [classes.Input]
  //   генерация уникального htmlFor для каждого инпута
  const htmlFor = `${inputType}-${Math.random()}`

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }
  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />

      {isInvalid(props) ? (
        <span>{props.errorMessage || 'Введите верное значение'}</span>
      ) : null}
    </div>
  )
}

export default Input

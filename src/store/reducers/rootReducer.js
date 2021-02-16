// rootReducer функция которая обьеденяет все редюсеры
import {combineReducers} from 'redux'
import quizReducer from './quiz'
import createReducer from './create'
import authReducer from "./auth";

export default combineReducers({
  // создаю стейт в сторе, регистрирую редюсер
  quiz: quizReducer,
  //регистрирую редюсер
  create: createReducer,
  //регистрирую редюсер авторизациии
  auth: authReducer
})
// rootReducer функция которая обьеденяет все редюсеры
import {combineReducers} from 'redux'
import quizReducer from './quiz'
import createReducer from './create'

export default combineReducers({
  // создаю стейт в сторе
  quiz: quizReducer,
  create: createReducer
})
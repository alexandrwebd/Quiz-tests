import {AUTH_LOGOUT, CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from '../actions/actionTypes'

const initialState = {
  quiz: []
}

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUIZ_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.item]
      }
    case RESET_QUIZ_CREATION:
      return {
        ...state, quiz: []
      }
    case AUTH_LOGOUT:
      return {
        ...state, token: null
      }
    default:
      return state
  }
}
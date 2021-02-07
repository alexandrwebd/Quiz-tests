// action creater которые нужны для тестов
import axios from '../../axios/axios-quiz'
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
  QUIZ_SET_STATE
} from './actionTypes'

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get('/quizes.json')

      // сосдаем пустой массив который обновит state, чтоб избежать мутации
      const quizes = []

      // проходим по обьекту получаем ключи проходим по массиву ключей
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      })

      // изменяем стор
      dispatch(fetchQuizesSuccess(quizes))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

//получает данные с сервера по id
export function fetchQuizById(quizId) {
  return async dispatch => {
    //loading
    dispatch(fetchQuizesStart())

    try {
      const response = await axios.get(`/quizes/${quizId}.json`)

      // присваиваем результат запроса копии массива в state
      const quiz = response.data

      // изменяем state
      dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState, results
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  }
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY
  }
}

// передает id правильного ответа при клике, переключает вопросы при правильном ответе
export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {

    //getState дает доступ к State
    const state = getState().quiz

    // при двойном клике не дает перескачить через вопрос
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] === 'success') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion]
    const results = state.results

    // если ответ равен правельному
    if (question.rightAnswerId === answerId) {
      // если ответили правильно и по ключю нету error
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      dispatch(quizSetState({[answerId]: 'success'}, results))

      const timeout = window.setTimeout(() => {
        // если вопросы закончились возвращает true
        if (isQuizFinished(state)) {
          //завершает тест и показывает другой компонент
          dispatch(finishQuiz())
        } else {
          // если не закончились переключаем на следущий и обнуляем обьект стилей
          dispatch(quizNextQuestion(state.activeQuestion + 1))
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      //если ответили не правильно
      results[question.id] = 'error'
      dispatch(quizSetState({[answerId]: 'error'}, results))
    }
  }
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length
}
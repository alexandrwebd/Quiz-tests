import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
  state = {
    results: {}, // { [id]: 'success' 'error'}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' 'error'}
    quiz: [
      {
        question: 'Какого цвета небо',
        rightAnswerId: 2,
        id: 1,
        answers: [
          { text: 'Черный', id: 1 },
          { text: 'Синий', id: 2 },
          { text: 'Красный', id: 3 },
          { text: 'Зеленый', id: 4 },
        ],
      },
      {
        question: 'В каком году основали Киев?',
        rightAnswerId: 2,
        id: 2,
        answers: [
          { text: '482', id: 1 },
          { text: '430', id: 2 },
          { text: '1002', id: 3 },
          { text: '803', id: 4 },
        ],
      },
    ],
  }

  // передает id правильного ответа при клике, переключает вопросы при правильном ответе
  onAnswerClickHandler = (answerId) => {
    // при двойном клике не дает перескачить через вопрос
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    // если ответ равен правельному
    if (question.rightAnswerId === answerId) {
      // если ответили правильно и по ключю нету error
      if (!results[question.id]) {
        results[question.id] = 'success'
      }
      this.setState({
        answerState: { [answerId]: 'success' },
        results,
      })

      const timeout = window.setTimeout(() => {
        // если вопросы закончились
        if (this.isQuizFinished()) {
          this.setState({ isFinished: true })
        } else {
          // если не закончились переключаем на следущий и обнуляем обьект стилей
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          })
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      //если ответили не правильно
      results[question.id] = 'error'
      this.setState({
        answerState: { [answerId]: 'error' },
        results,
      })
    }
  }

  // возвращает true если голосование закончилось
  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  // обнуляет state и запускает тесты заново
  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    })
  }
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {
            // Если вопросы закончились Finished если нет показываем
            this.state.isFinished ? (
              <FinishedQuiz
                results={this.state.results}
                quiz={this.state.quiz}
                onRetry={this.retryHandler}
              />
            ) : (
              <ActiveQuiz
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                onAnswerClick={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
              />
            )
          }
        </div>
      </div>
    )
  }
}

export default Quiz

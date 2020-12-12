import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

class Quiz extends Component {
  state = {
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
    const question = this.state.quiz[this.state.activeQuestion]

    if (question.rightAnswerId === answerId) {
      this.setState({
        answerState: { [answerId]: 'success' },
      })

      const timeout = window.setTimeout(() => {
        // если вопросы закончились
        if (this.isQuizFinished()) {
          console.log('Finished')
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
      this.setState({
        answerState: { [answerId]: 'error' },
      })
    }
  }

  // возвращает true если голосование закончилось
  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          <ActiveQuiz
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
            state={this.state.answerState}
          />
        </div>
      </div>
    )
  }
}

export default Quiz

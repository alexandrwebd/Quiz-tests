// import axios from 'axios'
import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import classes from './QuizList.module.css'
import axios from '../../axios/axios-quiz'

export default class QuizList extends Component {
  state = {
    quizes: [],
    // loader
    loading: true,
  }

  renderQuizes() {
    return this.state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
        </li>
      )
    })
  }

  // получаем данные с бд, дописываем расширение .json (при синтаксисе es 6 async пишем перед названием функции)
  async componentDidMount() {
    try {
      const response = await axios.get('/quizes.json')

      // сосдаем пустой массив который обновит state, чтоб избежать мутации
      const quizes = []

      // проходим по обьекту получаем ключи проходим по массиву ключей
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест № ${index + 1}`,
        })
      })

      // изменяем стейт
      this.setState({
        quizes,
        loading: false,
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>

          {this.state.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    )
  }
}

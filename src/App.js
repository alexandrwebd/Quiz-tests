import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'
//withRouter hoc добавляет роуты если используем connect
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/auth";

class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {

    let routes = (
        <Switch>
          {/*авторизация*/}
          <Route path="/auth" component={Auth} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" exact component={QuizList} />
          <Redirect to={"/"}/>
        </Switch>
    )

    // если пользователь залогинился показываем (переопределяем) другие роуты
    if(this.props.isAuthenticated) {
      routes = (
          <Switch>
            {/*генерация новых тестов*/}
            <Route path="/quiz-creator" component={QuizCreator} />
            <Route path="/quiz/:id" component={Quiz} />
            {/*роут для выхода из системы*/}
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={QuizList} />
            <Redirect to={"/"}/>
          </Switch>
      )
    }

    return (
      <Layout>
        { routes }
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
  //  проверяем авторизован пользователь илинет, если токен с сервера сохранен в стейте значит авторизован
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

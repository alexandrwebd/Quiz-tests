import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

// логинит пользователя и записывет его данные в localStorage
export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
          email, password,
          returnSecureToken: true,
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBnoLbZeqZ5xXwvDtTPNVQ_6XiwD_rCdBE'

        // если логинимся меняим url логина с firebase
        if (isLogin) {
            url =  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBnoLbZeqZ5xXwvDtTPNVQ_6XiwD_rCdBE'
        }
          const response = await axios.post(
            // api регистрации нового пользователя firebase берем на сайте
            // api key приложения берем на сайте
            url, authData
          )

        //данные с сервера firebase
        const data = response.data

        //время входа + 1 час, токен сесси даеться сервером на 1 час (3600 секунд)
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

        // чтобы держать сессию помещаем полученый токен, id пользователя, время входа в локал сторедж
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))

        // если время сессии вышло
        dispatch(autoLogout(data.expiresIn))
    }
}

// потдерживает сессию если остались валидные данные в локал сторедже
export function autoLogin() {
return dispatch => {
    const token = localStorage.getItem('token')
    // если токена нету диспатчим метод выхода из системмы
    if(!token) {
        dispatch(logout())
    } else {
        // если токен есть проверяем его валидность
        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        // если время токена (1 час/3600 сек) закончилось, выходим
        if (expirationDate <= new Date()) {
            dispatch(logout())
        } else {
            dispatch(authSuccess(token))
            // если время сессии вышло
            dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
        }
    }
}
}

// экшен логинит
export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

//метод разлогинюет по окончанию сессии
export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

//экшен разлогинюет
export function logout() {
    // обнуляем локалсторедж
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}
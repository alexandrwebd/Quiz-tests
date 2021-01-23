import axios from 'axios'

//возвращает базовый адрес к серверу
export default axios.create({
  baseURL: 'https://react-quiz-888c7-default-rtdb.firebaseio.com/',
})

import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-888c7-default-rtdb.firebaseio.com/'
})
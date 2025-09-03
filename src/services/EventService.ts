import axios from 'axios'

const apiClient = axios.create({
  // baseURL: 'https://my-json-server.typicode.com/RinZ5/331-intro-to-vite/',
  baseURL: 'http://localhost:8080/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'Application/json',
  },
})

export default {
  getEvents(perPage: Number, page: Number) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id: Number) {
    return apiClient.get('/events/' + id)
  },
}

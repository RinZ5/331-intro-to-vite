import axios from 'axios'
import type { Event } from '@/types'

const apiClient = axios.create({
  // baseURL: 'https://my-json-server.typicode.com/RinZ5/331-intro-to-vite/',
  baseURL: import.meta.env.VITE_BACKEND_URL,
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
  saveEvent(event: Event) {
    const { id, ...eventWithoutId } = event
    return apiClient.post('/events', eventWithoutId)
  },
}

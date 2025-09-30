import axios, { type AxiosResponse } from 'axios'
import type { EventItem } from '@/types'

const apiClient = axios.create({
  // baseURL: 'https://my-json-server.typicode.com/RinZ5/331-intro-to-vite/',
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getEvents(perPage: number, page: number) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id: number) {
    return apiClient.get('/events/' + id)
  },
  saveEvent(event: EventItem) {
    return apiClient.post('/events', event)
  },
  getEventsByKeyword(
    keyword: string,
    perPage: number,
    page: number,
  ): Promise<AxiosResponse<EventItem[]>> {
    return apiClient.get<EventItem[]>(
      '/events?title=' + keyword + '&_limit=' + perPage + '&_page=' + page,
    )
  },
}

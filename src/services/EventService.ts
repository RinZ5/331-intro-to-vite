import type { AxiosResponse } from 'axios'
import type { EventItem } from '@/types'
import apiClient from './AxiosClient'

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

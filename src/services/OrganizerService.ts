import axios from 'axios'
import type { Organizer } from '@/types'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'Application/json',
  },
})

export default {
  getOrganizers() {
    return apiClient.get('/organizers')
  },
  getOrganizer(id: number) {
    return apiClient.get('/organizers/' + id)
  },
  saveOrganizer(organizer: Organizer) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...organizerWithoutId } = organizer
    return apiClient.post('/organizers', organizerWithoutId)
  },
}

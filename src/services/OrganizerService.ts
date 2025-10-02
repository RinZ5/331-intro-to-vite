import type { Organizer } from '@/types'
import apiClient from './AxiosClient'

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

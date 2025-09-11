export interface Event {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petsAllowed: boolean
  organizer: string
}

export interface Student {
  id: number
  studentId: string
  name: string
  surname: string
  gpa: number
  image: string
  penAmount: number
  description: string
}

export interface MessagesState {
  message: string
  editMessage: string
}

export interface EventState {
  event: Event | null
}

export interface Organizer {
  id: number
  name: string
  address: string
}

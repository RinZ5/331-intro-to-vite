import { defineStore } from 'pinia'
import axios from 'axios'
import type { AxiosInstance } from 'axios'

interface AuthUser {
  id?: number
  name: string
  image?: string
}

function getSubjectFromToken(token: string | null): string | null {
  if (!token) {
    return null
  }

  try {
    const [, payload] = token.split('.')
    if (!payload) {
      return null
    }
    const decoded = JSON.parse(atob(payload))
    return decoded?.sub ?? null
  } catch (_error) {
    return null
  }
}

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as AuthUser | null,
  }),
  getters: {
    currentUserName(): string {
      return this.user?.name || ''
    },
    isAuthenticated(): boolean {
      return Boolean(this.token)
    },
  },
  actions: {
    login(email: string, password: string) {
      return apiClient
        .post('/api/v1/auth/authenticate', {
          username: email,
          password: password,
        })
        .then((response) => {
          this.token = response.data.access_token ?? null

          const rawUser = response.data.user
          let resolvedUser: AuthUser | null = null

          if (rawUser && typeof rawUser === 'object') {
            const receivedName = rawUser.name || rawUser.username || rawUser.email
            if (receivedName) {
              resolvedUser = { ...rawUser, name: receivedName }
            }
          }

          if (!resolvedUser) {
            const fallbackName = getSubjectFromToken(this.token) || email
            if (fallbackName) {
              resolvedUser = { name: fallbackName }
            }
          }

          this.user = resolvedUser

          if (this.token) {
            localStorage.setItem('access_token', this.token)
          } else {
            localStorage.removeItem('access_token')
          }

          if (this.user) {
            localStorage.setItem('user', JSON.stringify(this.user))
          } else {
            localStorage.removeItem('user')
          }
          // axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
          return response
        })
    },
    logout() {
      console.log('logout')
      this.token = null
      this.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    },
    reload(token: string, user: AuthUser | null) {
      this.token = token
      this.user = user
    },
  },
})

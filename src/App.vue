<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useMessageStore } from './stores/message'
import { storeToRefs } from 'pinia'
import { SpeedInsights } from '@vercel/speed-insights/vue'
import { mdiAccountPlus, mdiLogin } from '@mdi/js'
import { useAuthStore } from './stores/auth'

const store = useMessageStore()
const authStore = useAuthStore()
const router = useRouter()
const { message } = storeToRefs(store)

function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}

const token = localStorage.getItem('access_token')
const user = localStorage.getItem('user')
if (token && user) {
  authStore.reload(token, JSON.parse(user))
} else {
  authStore.logout()
}
</script>

<template>
  <SpeedInsights />
  <div class="text-center font-sans text-gray-700 antialiased">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <h1>Deploy with Vercel</h1>
      <div class="wrapper">
        <nav class="py-6">
          <nav class="flex">
            <ul v-if="!authStore.currentUserName" class="flex navbar-nav ml-auto">
              <li class="nav-item px-2">
                <router-link to="/register" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiAccountPlus" /> <span class="ml-3">Sign Up</span>
                  </div>
                </router-link>
              </li>
              <li class="nav-item px-2">
                <router-link to="/login" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiLogin" /> <span class="ml-3">Login</span>
                  </div>
                </router-link>
              </li>
            </ul>
            <ul v-if="authStore.currentUserName" class="flex navbar-nav ml-auto">
              <li class="nav-item px-2">
                <a class="nav-link hover:cursor-pointer" @click="logout">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiLogin" /> <span class="ml-3">LogOut</span>
                  </div>
                </a>
              </li>
            </ul>
          </nav>
          <RouterLink class="font-bold text-gray-700" exact exact-active-class="!text-green-500"
            :to="{ name: 'event-list-view' }">Event</RouterLink>
          |
          <RouterLink class="font-bold text-gray-700" exact exact-active-class="!text-green-500"
            :to="{ name: 'about' }">About</RouterLink>
          |
          <RouterLink class="font-bold text-gray-700" exact exact-active-class="!text-green-500"
            :to="{ name: 'add-event' }">New Event</RouterLink>
          |
          <RouterLink class="font-bold text-gray-700" exact exact-active-class="!text-green-500"
            :to="{ name: 'organizer-list-view' }">Organizer</RouterLink>
          |
          <RouterLink class="font-bold text-gray-700" exact exact-active-class="!text-green-500"
            :to="{ name: 'add-organizer' }">New Organizer</RouterLink>
          |
          <RouterLink class="font-bold text-gray-700" exact exact-active-class="!text-green-500"
            :to="{ name: 'student-view' }">Student</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style>
/* nav {
  padding: 30px;
} */

/* nav a {
  font-weight: bold;
  color: #2c3e50;
} */

/* nav a.router-link-exact-active {
  color: #43b983;
} */

/* .active-link-green {
  color: #43b983;
} */

/* @keyframes yellowfade {
  from {
    background-color: yellow;
  }

  to {
    background-color: transparent;
  }
}

#flashMessage {
  animation: yellowfade 3s ease-in-out;
} */
</style>

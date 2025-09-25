<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import type { Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import { RouterLink } from 'vue-router'
import router from '@/router'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / limit.value)
  // const totalPages = Math.ceil(totalEvents.value / 3)
  return page.value < totalPages
})
const maxEventsReach = computed(() => {
  return limit.value >= totalEvents.value
})
const props = defineProps({
  limit: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
})
const limit = computed(() => props.limit)
const page = computed(() => props.page)

const keyword = ref('')
function updateKeyword(value: string) {
  let queryFunction;
  if (keyword.value === '') {
    queryFunction = EventService.getEvents(3, page.value)
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, 3, page.value)
  }
  queryFunction.then((response) => {
    events.value = response.data
    console.log('events', events.value)
    totalEvents.value = response.headers['x-total-count']
    console.log('totalEvent', totalEvents.value)
  }).catch(() => {
    router.push({ name: 'NetworkError' })
  })
}

onMounted(() => {
  watchEffect(() => {
    // EventService.getEvents(limit.value, page.value)
    //   // EventService.getEvents(3, page.value)
    //   .then((response) => {
    //     events.value = response.data
    //     totalEvents.value = response.headers['x-total-count']
    //   })
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   .catch((error) => {
    //     router.push({ name: 'network-error-view' })
    //   })
    updateKeyword(keyword.value)
  })
})

</script>

<template>
  <h1>Events For Good</h1>
  <div class="flex flex-col items-center">
    <div class="w-64">
      <!-- <BaseInput v-model="keyword" label="Search..." @input="updateKeyword" /> -->
      <input v-model="keyword" placeholder="Search..." @input="updateKeyword"></input>
    </div>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="flex justify-between w-72 mb-4">
      <RouterLink id="page-prev" class="flex-1 text-left no-underline text-gray-700 hover:text-gray-900"
        :to="{ name: 'event-list-view', query: { limit, page: page - 1 } }" rel="prev" v-if="page != 1">&#60; Prev
        Page
      </RouterLink>
      <RouterLink id="page-next" class="flex-1 text-right no-underline text-gray-700 hover:text-gray-900"
        :to="{ name: 'event-list-view', query: { limit, page: page + 1 } }" rel="next" v-if="hasNextPage">Next Page
        &#62;</RouterLink>
    </div>
    <div class="flex justify-between w-72">
      <RouterLink id="decrease-limit" class="flex-1 text-left no-underline text-gray-700 hover:text-gray-900"
        :to="{ name: 'event-list-view', query: { limit: limit - 1, page } }" rel="decrease" v-if="limit != 1">&#60;
        Decrease Limit</RouterLink>
      <RouterLink id="incrase-limit" class="flex-1 text-right no-underline text-gray-700 hover:text-gray-900"
        :to="{ name: 'event-list-view', query: { limit: limit + 1, page } }" rel="incrase" v-if="!maxEventsReach">
        Incrase Limit &#62;</RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* .pagination,
.limit {
  display: flex;
  width: 290px;
}

.pagination a,
.limit a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev,
#decrease-limit {
  text-align: left;
}

#page-next,
#incrase-limit {
  text-align: right;
} */
</style>

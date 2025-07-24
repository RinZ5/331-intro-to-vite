<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import type { Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import { RouterLink } from 'vue-router'
import nProgress from 'nprogress'
import router from '@/router'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / limit.value)
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

onMounted(() => {
  watchEffect(() => {
    events.value = null
    EventService.getEvents(limit.value, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => {
        router.push({ name: 'nextwork-error-view' })
      })
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <RouterLink id="page-prev" :to="{ name: 'event-list-view', query: { limit, page: page - 1 } }" rel="prev"
        v-if="page != 1">&#60; Prev Page</RouterLink>
      <RouterLink id="page-next" :to="{ name: 'event-list-view', query: { limit, page: page + 1 } }" rel="next"
        v-if="hasNextPage">Next Page &#62;</RouterLink>
    </div>
    <div class="limit">
      <RouterLink id="decrease-limit" :to="{ name: 'event-list-view', query: { limit: limit - 1, page } }"
        rel="decrease" v-if="limit != 1">&#60; Decrease Limit</RouterLink>
      <RouterLink id="incrase-limit" :to="{ name: 'event-list-view', query: { limit: limit + 1, page } }" rel="incrase"
        v-if="!maxEventsReach">Incrase Limit &#62;</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination,
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
}
</style>

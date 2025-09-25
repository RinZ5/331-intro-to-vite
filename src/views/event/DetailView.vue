<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import type { Event } from '@/types'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  event: Event
  id: string
}>()
const { event } = toRefs(props)
const store = useMessageStore()
const { editMessage } = storeToRefs(store)
</script>

<template>
  <div id="editMessage" class="animate-fade" v-if="editMessage">
    <h4>{{ editMessage }}</h4>
  </div>
  <!-- <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p> -->
  <p>{{ event.title }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
  <div class="flex flex-row flex-wrap justify-center">
    <img v-for="image in event.images" :key="image" :src="image" alt="events image" class="border-soild border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg" />
  </div>
</template>

<style>
/* @keyframes yellowfade {
  from {
    background-color: yellow;
  }

  to {
    background-color: transparent;
  }
}

#editMessage {
  animation: yellowfade 3s ease-in-out;
} */
</style>

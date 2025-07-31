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
  <div id="editMessage" v-if="editMessage">
    <h4>{{ editMessage }}</h4>
  </div>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>

<style>
@keyframes yellowfade {
  from {
    background-color: yellow;
  }

  to {
    background-color: transparent;
  }
}

#editMessage {
  animation: yellowfade 3s ease-in-out;
}
</style>

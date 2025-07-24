<script setup lang="ts">
import { toRefs } from 'vue'
import type { Event } from '@/types'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';

const props = defineProps<{
  event: Event
  id: String
}>()

const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()
const edit = () => {
  store.updateEditMessage('The data has been update')
  setTimeout(() => {
    store.resetEditMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.event.id } })
}
</script>

<template>
  <p>Edit event here</p>
  <button @click="edit">Edit</button>
</template>

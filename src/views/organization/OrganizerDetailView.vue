<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Organizer } from '@/types'
import OrganizerService from '@/services/OrganizerService'

const organizer = ref<Organizer | null>(null)
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

onMounted(() => {
  OrganizerService.getOrganizer(parseInt(props.id))
    .then((response) => {
      organizer.value = response.data
    })
    .catch((error) => {
      console.log('There was an error!', error)
    })
})
</script>

<template>
  <div v-if="organizer">
    <h1>{{ organizer.name }}</h1>
    <p>{{ organizer.address }}</p>
    <div class="flex flex-row flex-wrap justify-center">
      <img v-if="organizer.image" :src="organizer.image" :alt="organizer.name"
        class="border-soild border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg" />
    </div>
  </div>
</template>

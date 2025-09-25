<script setup lang="ts">
import type { Organizer } from '@/types'
import { RouterLink } from 'vue-router'
defineProps<{
  organizer: Organizer
}>()
</script>

<template>
  <RouterLink class="organizer-link" :to="{ name: 'organizer-detail-view', params: { id: organizer.id.toString() } }">
    <div class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] hover:scale-101 hover:shadow-sp">
      <h2>{{ organizer.name }}</h2>
      <span>{{ organizer.address }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.organizer-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.organizer-link {
  text-decoration: none;
  color: #2c3e50;
}
</style>

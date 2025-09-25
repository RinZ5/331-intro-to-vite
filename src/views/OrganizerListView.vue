<script setup lang="ts">
import OrganizerCard from '@/components/OrganizerCard.vue'
import type { Organizer } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { RouterLink } from 'vue-router'
import router from '@/router'

const organizers = ref<Organizer[] | null>(null)
const totalOrganizers = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalOrganizers.value / limit.value)
  return page.value < totalPages
})
const maxOrganizersReach = computed(() => {
  return limit.value >= totalOrganizers.value
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
  // For now, we'll fetch all organizers without keyword filtering
  // since the Organizer type doesn't have a keyword-searchable field
  OrganizerService.getOrganizers()
    .then((response) => {
      organizers.value = response.data
      totalOrganizers.value = response.headers['x-total-count'] || response.data.length
    })
    .catch(() => {
      router.push({ name: 'NetworkError' })
    })
}

onMounted(() => {
  watchEffect(() => {
    updateKeyword(keyword.value)
  })
})
</script>

<template>
  <h1>Organizers For Good</h1>
  <div class="flex flex-col items-center">
    <div class="w-64">
      <input v-model="keyword" placeholder="Search..." @input="updateKeyword"></input>
    </div>
    <OrganizerCard v-for="organizer in organizers" :key="organizer.id" :organizer="organizer" />
    <div class="flex justify-between w-72 mb-4">
      <RouterLink id="page-prev" class="flex-1 text-left no-underline text-gray-700 hover:text-gray-900"
        :to="{ name: 'organizer-list-view', query: { limit, page: page - 1 } }" rel="prev" v-if="page != 1">&#60; Prev
        Page
      </RouterLink>
      <RouterLink id="page-next" class="flex-1 text-right no-underline text-gray-700 hover:text-gray-900"
        :to="{ name: 'organizer-list-view', query: { limit, page: page + 1 } }" rel="next" v-if="hasNextPage">Next Page
        &#62;</RouterLink>
    </div>
    <div class="flex justify-between w-72">
      <RouterLink id="decrease-limit" class="flex-1 text-left no-underline text-gray-700 hover:text-gray-900"
        :to="{ name: 'organizer-list-view', query: { limit: limit - 1, page } }" rel="decrease" v-if="limit != 1">&#60;
        Decrease Limit</RouterLink>
      <RouterLink id="increase-limit" class="flex-1 text-right no-underline text-gray-700 hover:text-gray-900"
        :to="{ name: 'organizer-list-view', query: { limit: limit + 1, page } }" rel="increase"
        v-if="!maxOrganizersReach">
        Increase Limit &#62;</RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* Additional styling can be added here if needed */
</style>

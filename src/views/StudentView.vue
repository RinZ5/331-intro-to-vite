<script setup lang="ts">
import StudentService from '@/services/StudentService'
import type { Student } from '@/types'
import { ref, onMounted } from 'vue'
import StudentCard from '@/components/StudentCard.vue'

const students = ref<Student[]>([])

onMounted(() => {
  StudentService.getStudents()
    .then((response) => {
      students.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <h1>Students</h1>
  <!-- new element -->
  <div class="students">
    <!-- <EventCard v-for="event in students" :key="event.id" :event="event" /> -->
    <StudentCard v-for="student in students" :key="student.id" :student="student" />
  </div>
</template>

<style scoped>
.students {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

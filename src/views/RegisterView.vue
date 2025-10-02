<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { useMessageStore } from '@/stores/message'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()
const messageStore = useMessageStore()

const schema = yup.object({
  username: yup.string().required('The username is required'),
  password: yup.string().required('The password is required'),
})

const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    username: '',
    password: '',
  },
})

const { value: username } = useField<string>('username')
const { value: password } = useField<string>('password')

const onSubmit = handleSubmit((values) => {
  authStore
    .register({
      username: values.username,
      password: values.password,
    })
    .then(() => {
      messageStore.updateMessage('Registration successful. Please sign in.')
      router.push({ name: 'login' })
      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
    })
    .catch(() => {
      messageStore.updateMessage('Could not register')
      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
    })
})
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create a new account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div class="mt-2">
            <InputText v-model="username" type="text" placeholder="username" :error="errors.username" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2">
            <InputText v-model="password" type="password" placeholder="••••••••" :error="errors.password" />
          </div>
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Create account
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already registered?
        <RouterLink :to="{ name: 'login' }" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign
          in here</RouterLink>
      </p>
    </div>
  </div>
</template>

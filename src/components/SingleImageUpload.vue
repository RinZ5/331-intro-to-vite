<script setup lang="ts">
import Uploader from 'vue-media-upload';
import { ref, watch } from 'vue';

interface Props {
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
})

const convertStringToMedia = (str: string): any => {
  if (!str) return []
  return [{
    name: str
  }]
}

const emit = defineEmits(['update:modelValue'])

const convertMediaToString = (media: any): string => {
  if (!media || media.length === 0) return ''
  return media[0]?.name || ''
}

const media = ref(convertStringToMedia(props.modelValue))
const uploadUrl = ref(import.meta.env.VITE_UPLOAD_URL)

const onChanged = (files: any) => {
  if (files && files.length > 0) {
    emit('update:modelValue', convertMediaToString([files[0]]))
  } else {
    emit('update:modelValue', '')
  }
}

watch(() => props.modelValue, (newValue) => {
  media.value = convertStringToMedia(newValue)
})
</script>

<template>
  <Uploader :server="uploadUrl" @change="onChanged" :media="media" :max="1"></Uploader>
</template>

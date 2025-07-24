import type { MessagesState } from "@/types";
import { defineStore } from "pinia";

export const useMessageStore = defineStore('message', {
  state: (): MessagesState => ({
    message: '',
    editMessage: ''
  }),
  actions: {
    updateMessage(message: string): void {
      this.message = message
    },
    resetMessage(): void {
      this.message = ''
    },
    updateEditMessage(message: string): void {
      this.editMessage = message
    },
    resetEditMessage(): void {
      this.editMessage = ''
    }
  }
})

// menuStore.js
import { defineStore } from 'pinia'

export const usePopupStore = defineStore('popup', {
  state: () => ({
    state: 'closed' // Initialize the state with a default value
  }),
  actions: {
    close() {
      this.state = 'closed'
    },
    edit() {
      this.state = 'edit'
    },
    upload() {
      this.state = 'upload'
    }
  }
})

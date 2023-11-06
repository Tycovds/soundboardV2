// menuStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { soundRef } from '../firebase'
import { uploadBytes } from 'firebase/storage'

export const usePopupStore = defineStore('popup', {
  state: () => ({
    state: 'closed',
    soundTitle: null,
    soundReference: null,
    audioFile: null
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
    },
    uploadAudio() {
      const audioStorageRef = ref(soundRef, this.audioFile.name)

      uploadBytes(audioStorageRef, this.audioFile, { customMetadata: { title: this.soundTitle } })
        .then((snapshot) => {
          console.log('Uploaded a file:', snapshot)
          this.close() // Use the correct this instance
        })
        .catch((error) => {
          console.error('Error uploading file:', error)
        })
    }
  }
})

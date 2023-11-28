// menuStore.js
import { defineStore } from 'pinia'

import { soundRef } from '../firebase'
import { uploadBytes, ref as soundReference } from 'firebase/storage'

export const usePopupStore = defineStore('popup', {
  state: () => ({
    popupState: 'closed',
    sound: {
      title: null,
      reference: null,
      file: null,
      playUrl: null
    }
  }),
  actions: {
    close() {
      this.popupState = 'closed'
      this.sound = { title: null, reference: null, file: null }
    },
    edit(title, reference, url) {
      this.popupState = 'edit',
      this.sound.title = title;
      this.sound.reference = reference;
      this.sound.playUrl = url;
      console.log(this.sound)
    },
    upload() {
      this.popupState = 'upload'
    },
    uploadAudio() {
      const audioStorageRef = soundReference(soundRef, this.sound.file.name)

      uploadBytes(audioStorageRef, this.sound.file.name, {
        customMetadata: { title: this.sound.title }
      })
        .then((snapshot) => {
          console.log('Uploaded a file:', snapshot)
          this.close()
        })
        .catch((error) => {
          console.error('Error uploading file:', error)
        })
    }
  }
})

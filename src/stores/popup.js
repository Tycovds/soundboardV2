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
      playUrl: null,
      volume: 1
    }
  }),
  actions: {
    close() {
      this.popupState = 'closed'
      this.sound = {   title: null,
        reference: null,
        file: null,
        playUrl: null,
        volume: 1 }
    },
    edit(title, reference, url, volume) {
      this.popupState = 'edit',
      this.sound.title = title;
      this.sound.reference = reference;
      this.sound.playUrl = url;
      this.sound.volume = volume;
    },
    upload() {
      this.popupState = 'upload'
    },
    uploadAudio() {
      const audioStorageRef = soundReference(soundRef, this.sound.file.name)

      uploadBytes(audioStorageRef, this.sound.file.name, {
        customMetadata: { title: this.sound.title, volume: this.sound.volume }
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

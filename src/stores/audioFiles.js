import { defineStore } from 'pinia'
import { listAll, getMetadata, getDownloadURL } from 'firebase/storage'

import { soundRef } from '../firebase'

export const useFilestore = defineStore('files', {
  state: () => ({
    files: []
  }),
  actions: {
    async getFiles() {
      try {
        const res = await listAll(soundRef)
        res.items.forEach(async (item) => {
          let soundData = {
            title: null,
            reference: null,
            playUrl: null,
            volume: 1
          }
          await getDownloadURL(item).then((url) => {
            soundData.playUrl = url
          })

          await getMetadata(item)
            .then((metadata) => {
              soundData.title = metadata.customMetadata.title
              if (metadata.customMetadata.volume) {
                soundData.volume = metadata.customMetadata.volume
              }
              soundData.reference = metadata.fullPath
            })
            .catch(() => {
              soundData.title = 'Geen titel'
            })
          this.files.push(soundData)
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
})

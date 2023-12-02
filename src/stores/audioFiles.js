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
        const res = await listAll(soundRef);
        const promises = res.items.map(async (item) => {
          let soundData = {
            title: null,
            reference: null,
            playUrl: null,
            volume: 1,
            createdAt: null,
          };
    
          soundData.playUrl = await getDownloadURL(item);
    
          try {
            const metadata = await getMetadata(item);
            soundData.title = metadata.customMetadata.title;
            soundData.createdAt = metadata.timeCreated;
            if (metadata.customMetadata.volume) {
              soundData.volume = metadata.customMetadata.volume;
            }
            soundData.reference = metadata.fullPath;
          } catch (error) {
            soundData.title = 'Geen titel';
          }
    
          return soundData;
        });
    
        this.files = await Promise.all(promises);
        this.files.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } catch (err) {
        console.log(err);
      }
    }
    
  }
})

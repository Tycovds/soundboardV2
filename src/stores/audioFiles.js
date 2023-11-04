import {defineStore} from 'pinia';
import {listAll} from 'firebase/storage'
import { soundRef } from '../firebase';

export const useFilestore = defineStore('files', {
    state: () => ({
        files: []
    }),
    actions: {
        async getFiles(){
            try {
                const res = await listAll(soundRef);
                this.files = res.items;

            } catch (err) {console.log(err);}
        }
    }
})
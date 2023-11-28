import {defineStore} from 'pinia';


export const useMenuStore = defineStore('menu',  {
  state: () => ({
    isOpen: false,
    isEditing: false,
    isUploading: false
  }),
  actions: {
    toggleOpen(){
      this.isOpen = !this.isOpen
    },
    toggleEdit(){
      this.isEditing = !this.isEditing;
      this.isUploading = false;
    },
    toggleUpload(){
      
    }
    
  }
  })
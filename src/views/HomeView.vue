<script setup>
import AppMenu from '@/components/AppMenu.vue'
import { ref, onBeforeMount } from 'vue';
import AudioGrid from '../components/Grid/AudioGrid.vue';
import SoundPopup from '@/components/SoundPopup.vue';
import { usePopupStore } from '../stores/popup';
import { useFilestore } from '../stores/audioFiles'
const soundStore = useFilestore()
const popupStore = usePopupStore();



let loading = ref(true);
onBeforeMount(async () => {
  try {
    await soundStore.getFiles();
    loading.value = false;

  } catch (err) {
    console.log(err)
  }
})

</script>

<template>
  <AppMenu />
  <main>
    <div class="centered">
      <h1>Future Ready Design</h1>
      <h2>Soundboard</h2>

      <h3 v-if="loading" class="loading">Loading...</h3>

      <AudioGrid v-else />
    </div>
  </main>
  <SoundPopup v-if="popupStore.popupState !== 'closed'" />
</template>

<style lang="scss" scoped>
main {
  display: flex;
  height: 100%;
  padding: clamp(16px, 3%, 40px);
  flex-direction: column;

  .centered {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-size: clamp(20px, 7vmin, 50px);
    font-weight: 900;
  }

  h2 {
    font-weight: 500;
    margin-bottom: 4rem;
  }

  h1,
  h2 {
    color: #ffffff;
    font-family: 'Outfit', sans-serif;
    text-align: center;
    padding: 0 2.5rem;
  }
}
</style>
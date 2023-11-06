

<template>
  <div @click="() => { playSound(soundUrl) }" class="grid-item">
    <p>{{ title }}</p>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { getMetadata, getDownloadURL } from 'firebase/storage'

const props = defineProps({
  sound: {
    required: true,
    type: Object
  }
})
let title = ref('');
let soundUrl = ref('');


onBeforeMount(async () => {
  getDownloadURL(props.sound).then((url) => {
    soundUrl.value = url;
  });


  getMetadata(props.sound)
    .then((metadata) => {
      title.value = metadata.customMetadata.title;
    })
    .catch(() => {
      title.value = 'Geen titel';
    });
})

function playSound(url) {
  let audio = new Audio(url);
  audio.volume = 1;
  audio.play();
}
</script>

<style lang="scss" scoped>
.grid-item {
  border-radius: 12px;
  background: linear-gradient(145deg, #1f1f1f, #242424);
  box-shadow: 11px 11px 30px #1c1c1c,
    -11px -11px 30px #282828;
  display: flex;
  text-align: center;
  padding: 1rem 2rem;
  justify-content: center;
  cursor: pointer;
  p {
    font-weight: 600;
    font-size: clamp(14px, 2vmin, 21px);
    cursor: pointer;
    user-select: none;
  }
}
</style>
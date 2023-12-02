

<template>
  <div :class="{ 'is-playing': isPlaying }" @click="handleClick" class="grid-item">
    <p>{{ props.sound.title }}</p>
    <img v-if="menuStore.isEditing" src="../../assets//icons/Edit.svg" alt="editing icon">
    <div v-if="!menuStore.isEditing" class="grid-item_bg"><img src="../../assets/icons/Audio.svg" alt="audio icon"></div>
  </div>
</template>

<script setup>
import { useMenuStore } from '../../stores/menu';
import { usePopupStore } from '../../stores/popup';
import { ref } from 'vue';

const menuStore = useMenuStore();
const popupStore = usePopupStore();

const props = defineProps({
  sound: {
    required: true
  }
})


let isPlaying = ref(false);
let audio = ref(null);

const handleClick = () => {
  if (menuStore.isEditing) {
    popupStore.edit(props.sound.title, props.sound.reference, props.sound.playUrl, props.sound.volume)
    menuStore.toggleEdit()
  }
  else if (menuStore.isUploading) {
    popupStore.upload()
  } else {
    playSound()
  }

}

function playSound() {
  if(audio.value == null){
    audio.value = new Audio(props.sound.playUrl);
  } else {
    audio.value.pause();
    audio.value.currentTime = 0;
    audio.value = new Audio(props.sound.playUrl);
  }
  audio.value.addEventListener('ended', function () {
    isPlaying.value = false;
  });

  isPlaying.value = true;
  audio.value.volume = props.sound.volume;
  audio.value.play()
  
}
</script>

<style lang="scss" scoped>
.grid-item {
  position: relative;
  border-radius: 8px;
  background: linear-gradient(145deg, #2c2c2c, #525252);
  box-shadow: 5px 5px 20px #2e2e2e;
  display: flex;
  text-align: center;
  padding: 1rem 2rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  outline: solid #00000000 1px;

  &:hover .grid-item_bg {
    display: flex;
  }

  p {
    font-weight: 600;
    font-size: clamp(14px, 2vmin, 21px);
    cursor: pointer;
    user-select: none;
  }

  >img {
    position: absolute;
    top: .5rem;
    right: .5rem;
  }

  .grid-item_bg {
    display: none;
    justify-content: center;
    align-items: center;
    position: absolute;

    background: rgba(41, 41, 41, 0.8);
    border-radius: 8px;
    inset: 0 0 0 0;

    img {
      width: 24px;
      user-select: none;
      pointer-events: none;
    }
  }

}

.is-playing {
  outline: solid rgb(138, 138, 138) 2px;
}</style>
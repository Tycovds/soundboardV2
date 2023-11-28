

<template>
  <div @click="handleClick" class="grid-item">
    <p>{{ props.sound.title }}</p>
    <img v-if="menuStore.isEditing" src="../../assets//icons/Edit.svg" alt="editing icon">
  </div>
</template>

<script setup>
import { useMenuStore } from '../../stores/menu';
import { usePopupStore } from '../../stores/popup';

const menuStore = useMenuStore();
const popupStore = usePopupStore();

const props = defineProps({
  sound: {
    required: true
  }
})


const handleClick = () => {
  if (menuStore.isEditing) {
    popupStore.edit(props.sound.title, props.sound.reference, props.sound.url, props.sound.volume)
    menuStore.toggleEdit()
  }
  else if (menuStore.isUploading) {
    popupStore.upload()
  } else {
    playSound()
  }

}

function playSound() {
  let audio = new Audio(props.sound.playUrl);
  audio.volume = props.sound.volume;
  audio.play();
}
</script>

<style lang="scss" scoped>
.grid-item {
  position: relative;
  border-radius: 12px;
  background: linear-gradient(145deg, #1f1f1f, #242424);
  box-shadow: 11px 11px 30px #1c1c1c,
    -11px -11px 30px #282828;
  display: flex;
  text-align: center;
  padding: 1rem 3rem;
  justify-content: center;
  cursor: pointer;

  p {
    font-weight: 600;
    font-size: clamp(14px, 2vmin, 21px);
    cursor: pointer;
    user-select: none;
  }

  img {
    position: absolute;
    top: .5rem;
    right: .5rem;
  }
}
</style>
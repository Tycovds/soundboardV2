<template>
    <header class="menu">
        <div :class="[menu.isOpen ? 'clipped wrapperOpen' : 'clipped']">
            <div :class="[menu.isOpen ? 'wrapper open' : 'wrapper']">
                <div @click="menu.toggleOpen" class="menu-item">
                    <img src="../assets/icons/Menu.svg" alt="menu icon" />
                </div>
                <div @click="menu.toggleEdit" class="menu-item">
                    <img src="../assets/icons/Edit.svg" alt="menu icon" />
                </div>
                <div @click="popup.upload()" class="menu-item">
                    <img src="../assets/icons/Upload.svg" alt="menu icon" />
                </div>
            </div>
        </div>
        <svg class="svg">
            <clipPath :id="'my-clip-path'" clipPathUnits="objectBoundingBox">
                <path d="M0,0 H1 V0.87 C1,0.942,0.776,1,0.5,1 V1 C0.224,1,0,0.942,0,0.87 V0" />
            </clipPath>
        </svg>
    </header>
</template>
  
<script setup>
import { useMenuStore } from '../stores/menu';
import {usePopupStore} from '../stores/popup';
const menu = useMenuStore();
const popup = usePopupStore();

</script>
  
<style scoped>
.menu {
    position: fixed;
    top: 0;
    left: 2rem;
    z-index: 3;
    overflow: hidden;
}

.wrapper {
    width: 56px;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 27px;
    align-items: center;
    top: 168px;
    transition: top 400ms ease;
}

.open {
    top: 39px;
}

.svg {
    position: absolute;
    width: 0;
    height: 0;
}

.menu-item {
    color: #fff;
    width: 38px;
    height: 38px;
    background: #a6a6a6;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    cursor: pointer;
}

.clipped {
    width: 56px;
    height: 216px;
    -webkit-clip-path: url(#my-clip-path);
    clip-path: url(#my-clip-path);
    position: relative;
    background: #ffffff44;
    top: -129px;
    transition: top 400ms ease;
}

.wrapperOpen {
    top: 0px;
}
@media screen and (max-width:676px){
    .menu {
        bottom: 0;
        right: 2rem;
        left: unset;
        transform: rotate(180deg);
    }
    .menu-item {
        transform: rotate(180deg);
    }
}
</style>
  
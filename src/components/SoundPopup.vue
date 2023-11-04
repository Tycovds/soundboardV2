<template>
    <div @click.self="popupStore.close()" class="popup-wrapper">
        <div class="popup">

            <div v-if="popupStore.state == 'edit'">
                <h1>Editing</h1>
            </div>
            <div v-if="popupStore.state == 'upload'">
                <h1>Uploading</h1>
            </div>
        </div>
    </div>
</template>

<script setup>
import { usePopupStore } from '../stores/popup';
const popupStore = usePopupStore();

</script>

<style lang="scss" scoped>
.popup-wrapper {
    position: absolute;
    inset: 0 0 0 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;

    .popup {
        height: 50vh;
        width: clamp(100px, 50vmax, 600px);
        border-radius: 29px;
        background: linear-gradient(145deg, #242424, #1f1f1f);
        box-shadow: 32px 32px 64px #151515,
            -32px -32px 64px #2f2f2f;
        padding: clamp(10px, 3%, 30px);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

}
</style>
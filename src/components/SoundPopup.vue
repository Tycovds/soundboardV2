<template>
    <div @click.self="popupStore.close()" class="popup-wrapper">
        <div class="popup">

            <div v-if="popupStore.popupState == 'edit'">
                <form @submit.prevent="handleAudioEdit">
                    <h1>Editing: {{ popupStore.sound.title}}</h1>
                    <div>
                        <input class="input-field" type="text" name="fileTitle" id="file-title" placeholder="Title" v-model="popupStore.sound.title">
                        <div class="fields-2">

                            <input type="range" step="0.05" min="0" max="1">
                            <button type="submit" class="submit-button">Edit</button>
                        </div>
                    </div>
                </form>
            </div>


            <div v-if="popupStore.popupState == 'upload'">
                <form @submit.prevent>
                    <h1>Upload a new sound</h1>
                    <div class="input-fields">
                        <div v-if="!popupStore.audioFile" class="uploading">
                            <input class="input-field" type="text" name="fileTitle" id="file-title"
                                placeholder="Geef jouw geluid een titel...">
                            <div class="file-input-container">
                                <label class="file-input-label" for="file-input">Choose a File</label>
                                <input @change="handleAudioUpload"  type="file" id="file-input" class="file-input" accept=".wav, .mp3" />
                            </div>
                        </div>
                        <div v-else class="uploaded">
                            <input type="range" step="0.05" min="0" max="1">
                            <button>Play sound</button>
                        </div>
                    </div>
                    <button type="submit" class="submit-button">Upload</button>
                </form>
            </div>

        </div>
    </div>
</template>

<script setup>

import { usePopupStore } from '../stores/popup';
const popupStore = usePopupStore();


function handleAudioUpload(e) {
    if (e.target.files[0].length > 0) {
        popupStore.sound.file = e.target.files[0];
    }
}

function handleAudioEdit(){
    console.log('edited');
}



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
        // height: 50vh;
        // width: clamp(100px, 50vmax, 600px);
        border-radius: 29px;
        background: linear-gradient(145deg, #242424, #1f1f1f);
        box-shadow: 32px 32px 64px #151515,
            -32px -32px 64px #2f2f2f;
        padding: clamp(10px, 3%, 30px);
        display: flex;
        flex-direction: column;
        align-items: center;

        h1 {
            margin-bottom: 1rem;
        }

        .input-fields {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .file-input {
            display: none;

        }

        .file-input-label {
            cursor: pointer;
            /* Show a pointer cursor on hover */
            padding: 10px 20px;
            background-color: #2f8cef;
            color: #fff;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            transition: background-color 0.2s;

            /* Styling on hover */
            &:hover {
                background-color: #104b8a;
            }

            /* Styling on focus (for accessibility) */
            &:focus {
                outline: none;
                box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
            }
        }

        #file-title {
            width: 300px;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;

        }

        /* Custom button style */
        .submit-button {
            padding: 10px 20px;
            background-color: #3472b4;
            color: #fff;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.2s;

            /* Styling on hover */
            &:hover {
                background-color: #1b5088;
            }

            /* Styling on focus (for accessibility) */
            &:focus {
                outline: none;
                box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
            }
        }


    }
}
</style>
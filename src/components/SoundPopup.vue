<template>
    <div @click.self="popupStore.close()" class="popup-wrapper">
        <div class="popup">

            <div v-if="popupStore.popupState == 'edit'">
                <form class="edit-form" @submit.prevent="handleAudioEdit">
                    <div class="form-header">
                        <h1>{{ popupStore.sound.title }}</h1>
                        <svg @click="handleAudioDelete" width="56" height="72" viewBox="0 0 56 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4 64C4 68.4 7.6 72 12 72H44C48.4 72 52 68.4 52 64V16H4V64ZM12 24H44V64H12V24ZM42 4L38 0H18L14 4H0V12H56V4H42Z"
                                fill="white" />
                        </svg>

                    </div>
                    <div class="form-body">
                        <input autocomplete="off" class="input-field" type="text" name="fileTitle" id="file-title"
                            placeholder="Title" v-model="popupStore.sound.title">
                        <div class="form-body_end">
                            <input v-model="popupStore.sound.volume" type="range" step="0.05" min="0" max="1">
                            <button type="submit" class="submit-button">Save</button>
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
                                <input @change="handleAudioUpload" type="file" id="file-input" class="file-input"
                                    accept=".wav, .mp3" />
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
import { updateMetadata, ref, deleteObject } from 'firebase/storage'
import { storageRef } from '../firebase'
import { useFilestore } from '../stores/audioFiles'
const popupStore = usePopupStore();
const fileStore = useFilestore()


function handleAudioUpload(e) {
    if (e.target.files[0].length > 0) {
        popupStore.sound.file = e.target.files[0];
    }
}

function handleAudioEdit() {
    updateMetadata(ref(storageRef, popupStore.sound.reference), { customMetadata: { title: popupStore.sound.title, volume: popupStore.sound.volume } })
        .then(() => {
            console.log('Metadata updated successfully.');
              Object.assign(fileStore.files[fileStore.files.map((value) =>  value.reference).indexOf(popupStore.sound.reference)], {title: popupStore.sound.title, volume: popupStore.sound.volume} )

            popupStore.close()

        })
        .catch(error => {
            console.error('Error updating metadata:', error);
        });
}
function handleAudioDelete(){
    deleteObject(ref(storageRef, popupStore.sound.reference));
    fileStore.files.splice(fileStore.files.map((value) =>  value.reference).indexOf(popupStore.sound.reference), 1);
    popupStore.close()
}



</script>

<style lang="scss" scoped>
.popup-wrapper {
    position: absolute;
    inset: 0 0 0 0;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(3px);
    transition: backdrop-filter 1s ease;

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
        max-width: 500px;

        .form-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;

            h1 {
                word-break: break-all;
            }

            svg {
                height: 24px;
                cursor: pointer;

                path {
                    transition: fill 400ms ease;
                }

                &:hover path {
                    fill: #ff4444;
                }
            }
        }

        .form-body {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            .form-body_end {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 2rem;

                input[type="range"] {
                    flex: 4;
                }

                button[type="submit"] {
                    flex: 1;
                }

            }
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
}</style>
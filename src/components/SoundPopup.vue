<template>
    <div class="popup-wrapper">
        <div class="popup">

            <div v-if="popupStore.popupState == 'edit'">
                <form class="edit-form" @submit.prevent="handleAudioEdit">
                    <div class="form-header">
                        <h1>Edit sound</h1>
                        <svg @click="handleAudioDelete" width="56" height="72" viewBox="0 0 56 72" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4 64C4 68.4 7.6 72 12 72H44C48.4 72 52 68.4 52 64V16H4V64ZM12 24H44V64H12V24ZM42 4L38 0H18L14 4H0V12H56V4H42Z"
                                fill="white" />
                        </svg>

                    </div>
                    <div class="form-body">
                        <input autocomplete="off" class="input-field" type="text" name="fileTitle" id="file-title"
                            placeholder="Title" v-model="popupStore.sound.title">
                        <div class="sound-preview">
                            <input v-model="popupStore.sound.volume" type="range" step="0.05" min="0.1" max="1">
                            <button type="button" @click="() => { playSound(popupStore.sound.playUrl) }"><img
                                    src="../assets/icons/Audio.svg" /></button>
                        </div>
                        <div class="form-controls">
                            <p @click.self="popupStore.close">Cancel</p>
                            <button v-if="popupStore.sound.title !== ''" type="submit" class="submit-button">Save</button>
                        </div>
                    </div>
                </form>
            </div>


            <div v-if="popupStore.popupState == 'upload'">
                <form @submit.prevent="handleAudioUpload">
                    <div class="form-header">
                        <h1>Upload a new sound</h1>
                    </div>
                    <div class="form-body">
                        <input class="input-field" type="text" name="fileTitle" id="file-title"
                            placeholder="Geef jouw geluid een titel..." autocomplete="off" v-model="popupStore.sound.title">
                        <div v-if="!popupStore.sound.file" class="sound-preview">
                            <label class="file-input-label" for="file-input">Choose a File</label>
                            <input @change="handleFilePick" type="file" id="file-input" class="file-input"
                                accept=".wav, .mp3" />
                        </div>
                        <div class="sound-preview">
                            <input v-if="popupStore.sound.file" type="range" step="0.05" min="0.1" max="1"
                                v-model="popupStore.sound.volume">
                            <button type="button" @click="() => { playSound(playUrl) }" v-if="popupStore.sound.file"><img
                                    src="../assets/icons/Audio.svg" /></button>
                        </div>
                        <div class="form-controls">
                            <p @click.self="popupStore.close">Cancel</p>
                            <button v-if="popupStore.sound.file && popupStore.sound.title !== null && popupStore.sound.title !== ''" type="submit" class="submit-button">Upload</button>
                        </div>

                    </div>
                </form>
            </div>

        </div>
    </div>
</template>

<script setup>

import { usePopupStore } from '../stores/popup';
import { updateMetadata, ref, deleteObject, uploadBytes } from 'firebase/storage'
import { storageRef } from '../firebase'
import { useFilestore } from '../stores/audioFiles'
import { ref as vueRef } from 'vue'
const popupStore = usePopupStore();
const fileStore = useFilestore()

let playUrl = vueRef(null)
async function handleFilePick(e) {
    if (e.target.files.length > 0) {
        popupStore.sound.file = e.target.files[0];
        playUrl.value = URL.createObjectURL(e.target.files[0]);
    }
}
function playSound(url) {
    let audio = new Audio(url);
    audio.volume = popupStore.sound.volume;
    audio.play();
}
async function handleAudioUpload() {
    if (popupStore.sound.file !== null && popupStore.sound.title !== null) {
        uploadBytes(ref(storageRef, 'sounds/' + popupStore.sound.file.name), popupStore.sound.file, { customMetadata: { title: popupStore.sound.title, volume: popupStore.sound.volume } })
            .then((val) => {
                fileStore.files.push({
                    title: popupStore.sound.title,
                    reference: val.ref,
                    playUrl: playUrl,
                    volume: popupStore.sound.volume
                })
                popupStore.close()
            })
    } else {
        alert('Choose title and file')
    }
}

function handleAudioEdit() {
    updateMetadata(ref(storageRef, popupStore.sound.reference), { customMetadata: { title: popupStore.sound.title, volume: popupStore.sound.volume } })
        .then(() => {
            console.log('Metadata updated successfully.');
            Object.assign(fileStore.files[fileStore.files.map((value) => value.reference).indexOf(popupStore.sound.reference)], { title: popupStore.sound.title, volume: popupStore.sound.volume })

            popupStore.close()

        })
        .catch(error => {
            console.error('Error updating metadata:', error);
        });
}
function handleAudioDelete() {
    deleteObject(ref(storageRef, popupStore.sound.reference));
    fileStore.files.splice(fileStore.files.map((value) => value.reference).indexOf(popupStore.sound.reference), 1);
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
        padding: clamp(10px, 6vmin, 24px) clamp(20px, 6vmin, 50px);
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 80vw;
        position: relative;

        .form-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;

            h1 {
                word-break: break-all;
                font-size: 24px;
            }

            svg {
                height: 20px;
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

            .sound-preview {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 2rem;

                input[type="range"] {
                    flex: 4;

                }

                button {
                    // flex: 1;
                    // border-radius: 12px;
                    // background: linear-gradient(145deg, #1f1f1f, #242424);
                    // box-shadow: 11px 11px 30px #1c1c1c,
                    //     -11px -11px 30px #282828;
                    background: none;
                    // padding: 0.5rem;
                    cursor: pointer;

                    img {
                        height: 24px;
                        width: 24px;
                        object-fit: contain;

                    }
                }
            }

            .form-controls {
             display: flex;
             justify-content: flex-end;
             align-items: center;
             gap: 1rem;
             p {
                cursor: pointer;
             }
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
                width: 100%;

                max-width: 300px;
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
}
</style>
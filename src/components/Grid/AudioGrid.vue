<template>
    <div class="grid">
        <GridItem v-for="file in files" :key="file" :sound="file" />
    </div>
</template>

<script setup>
import GridItem from './GridItem.vue';
import { useFilestore } from '../../stores/audioFiles';
const files = useFilestore().files;
</script>

<style lang="scss" scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}
</style>
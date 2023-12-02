<template>
    <div class="grid">
        <GridItem v-for="file in files" :key="file" :sound="file" />
    </div>
</template>

<script setup>
import GridItem from '@/components/Grid/GridItem.vue';
import { useFilestore } from '../../stores/audioFiles';
const files = useFilestore().files;



</script>

<style lang="scss" scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
    align-items: stretch;
    justify-content: stretch;
    width: 90%;
    max-width: 1100px;
}

@media screen and (min-width: 350px){
    
    .grid {
        grid-template-columns: repeat(2, 1fr);
   
    }
}
@media screen and (min-width: 676px){
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
@media screen and (min-width: 1024px){
    .grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
@media screen and (min-width: 1400px){
    .grid {
        grid-template-columns: repeat(5, 1fr);
    }
}
</style>
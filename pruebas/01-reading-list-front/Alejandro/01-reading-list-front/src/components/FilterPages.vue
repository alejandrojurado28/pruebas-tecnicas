<script setup lang="ts">
    import 'tailwindcss/tailwind.css';
    import { ref, defineEmits } from 'vue';
    import booksData from '../assets/books.json';

    const selectedPages = ref(0);
    const maxPages = 1300;

    const emit = defineEmits(['pagesFilter']);

    const emitPagesFilter = () => {
        emit('pagesFilter', selectedPages.value);
    }
</script>

<template>
    <div>
        <label class="mr-4" for="pages">Filtrar por páginas</label>
        <input class="mr-5" type="range" name="pages" id="pages" min="0" :max="maxPages" v-model="selectedPages" @input="emitPagesFilter">
        <span class="text-white">{{ selectedPages }}</span>
    </div>
</template>

<style scoped>

</style>
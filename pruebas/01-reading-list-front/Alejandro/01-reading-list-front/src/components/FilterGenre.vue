<script setup lang=ts>
    import 'tailwindcss/tailwind.css';
    import { ref, computed, defineEmits } from 'vue';
    import booksData from '../assets/books.json';

    const selectedGenre = ref('');
    const books = booksData.library;

    const genres = computed(() => {
        const allGenres = books.map(book => book.book.genre);
        return [...new Set(allGenres)]; // Eliminar duplicados
    })

    const emit = defineEmits(['genreFilter']);

    const emitGenderFilter = () => {
        emit('genreFilter', selectedGenre.value);
    }
</script>

<template>
    <p>Filtrar por género</p>
    <select v-model="selectedGenre" @change="emitGenderFilter" class="px-4 py-2 rounded-lg bg-white text-gray-800" name="genero" id="genero">
        <option value="">Todos</option>
        <option v-for="genre in genres" :key="genre">{{ genre }}</option>
    </select>
</template>

<style scoped>

</style>
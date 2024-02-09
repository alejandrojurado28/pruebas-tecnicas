<script setup lang="ts">
  import 'tailwindcss/tailwind.css';
  import booksData from './assets/books.json';
  import FilterGenre from './components/FilterGenre.vue';
  import { ref, computed } from 'vue';

  const books = booksData.library;
  const selectedGenre = ref('');

  const filteredBooks = computed(() => {
    if (selectedGenre.value === '') {
      return books;
    } else {
      return books.filter(book => book.book.genre === selectedGenre.value);
    }
  });

  const handleGenreFilter = (genre) => {
    selectedGenre.value = genre;
  };
</script>

<template>
  <div class="bg-black p-8">
    <h1 class="font-comic-sans text-white">8 Libros disponibles</h1>
    <div>
      <GenreFilter @genreFilter="handleGenrerFilter"></GenreFilter>
    </div>
    <div class="grid grid-cols-3 gap-4 mt-4">
      <div v-for="(book, index) in books" :key="index" class="p-4 border border-gray-300 rounded-lg">
        <img :src="book.book.cover" alt="Portada del libro" class="mx-auto mb-4 w-40 h-56 object-cover">
        <h2 class="text-xl font-semibold text-white">Título: {{ book.book.title }}</h2>
        <p class="text-gray-600 text-white">Género: {{ book.book.genre }}</p>
        <p class="mt-2 text-white">Autor: {{ book.book.author.name }}</p>
        <p class="text-white">Páginas: {{ book.book.pages }}</p>
        <p class="text-white">Año: {{ book.book.year }}</p>
        <p class="text-white">ISBN: {{ book.book.ISBN }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Comic+Sans+MS&display=swap');
</style>

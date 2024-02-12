<script setup lang="ts">
  import 'tailwindcss/tailwind.css';
  import booksData from './assets/books.json';
  import FilterGenre from './components/FilterGenre.vue';
  import FilterPages from './components/FilterPages.vue';
  import BookStar from './components/BookStar.vue';
  import { ref, computed } from 'vue';

  const books = booksData.library;
  const selectedGenre = ref('');
  const selectedPages = ref(0);

  const filteredBooks = computed(() => {
    let result = books;

    if (selectedGenre.value !== '') {
      result = result.filter(book => book.book.genre === selectedGenre.value);
    } 

    if (selectedPages.value > 0) {
      result = result.filter(book => book.book.pages <= selectedPages.value);
    }

    return result;
  });

  const handleGenreFilter = (genre: string) => {
    selectedGenre.value = genre;
  };

  const handlePagesFilter = (pages: number) => {
    selectedPages.value = pages;
  };

</script>

<template>
  <div class="bg-black p-8 text-white">
    <h1 class="mb-6 text-4xl font-bold">Librería📚</h1>
    <h1 class="flex justify-between items-center mb-4">{{ filteredBooks.length }} Libros disponibles</h1>
    <div class="flex items-center space-x-4">
      <FilterGenre @genreFilter="handleGenreFilter"></FilterGenre>
      <FilterPages @pagesFilter="handlePagesFilter"></FilterPages>
    </div>
    <div class="mt-4">
      <h3>Pulsa click sobre los libros para añadirlos a favoritos</h3>
    </div>
    <div class="grid grid-cols-3 gap-4 mt-4">
      <BookStar v-for="(book, index) in filteredBooks" :key="index" :book="book"></BookStar>
    </div>
    <div class="mt-6">
    </div>
  </div>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Comic+Sans+MS&display=swap');
</style>

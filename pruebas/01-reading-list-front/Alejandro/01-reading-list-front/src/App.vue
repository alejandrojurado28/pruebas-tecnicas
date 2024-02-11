<script setup lang="ts">
  import 'tailwindcss/tailwind.css';
  import booksData from './assets/books.json';
  import FilterGenre from './components/FilterGenre.vue';
  import FilterPages from './components/FilterPages.vue';
  import { ref, computed } from 'vue';
  import type { Book } from '@/bookTypes';

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

  // Agregar método para alternar entre favorito y no favorito
  const toggleStarred = (book: Book) => {
    book.isStarred = !book.isStarred;
  };
  

</script>

<template>
  <div class="bg-black p-8">
    <h1 class="font-comic-sans text-white">{{ filteredBooks.length }} Libros disponibles</h1>
    <div class="flex items-center space-x-4">
      <FilterGenre @genreFilter="handleGenreFilter"></FilterGenre>
      <FilterPages @pagesFilter="handlePagesFilter"></FilterPages>
    </div>
    <div class="grid grid-cols-3 gap-4 mt-4">
      <div v-for="(book, index) in filteredBooks" :key="index" class="p-4 border border-gray-300 rounded-lg">
        <img :src="book.book.cover" alt="Portada del libro" class="mx-auto mb-4 w-40 h-56 object-cover">
        <h2 @click="() => toggleStarred(book)" class="text-xl font-semibold text-white">{{ book.book.isStarred ? '⭐ ' : '' }} Título: {{ book.book.title }}</h2>
        <p class="text-gray-600 text-white">Género: {{ book.book.genre }}</p>
        <p class="mt-2 text-white">Autor: {{ book.book.author.name }}</p>
        <p class="text-white">Páginas: {{ book.book.pages }}</p>
        <p class="text-white">Año: {{ book.book.year }}</p>
        <p class="text-white">ISBN: {{ book.book.ISBN }}</p>
      </div>
    </div>
    <div class="mt-6">
    </div>
  </div>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Comic+Sans+MS&display=swap');
</style>

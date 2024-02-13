<script setup lang="ts">
  import 'tailwindcss/tailwind.css';
  import booksData from './assets/books.json';
  import FilterGenre from './components/FilterGenre.vue';
  import FilterPages from './components/FilterPages.vue';
  import BookStar from './components/BookStar.vue';
  import { ref, computed, onMounted, onUnmounted } from 'vue';

  // Define una interfaz para representar la estructura del objeto book
  interface Book {
    book: {
      title: string;
      pages: number;
      genre: string;
      cover: string;
      synopsis: string;
      year: number;
      ISBN: string;
      isStarred: boolean;
      author: {
        name: string;
        otherBooks: string[];
      };
    };
  }

  const books = booksData.library;
  const selectedGenre = ref('');
  const selectedPages = ref(0);
  const favoriteBooks = ref<Book[]>([]);

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

  const handleFavoriteToggled = (data: { book: Book; isFavorite: boolean }) => { // Usa el tipo Book para book
    const { book, isFavorite } = data;
    if (isFavorite) {
      favoriteBooks.value.push(book);
      localStorage.setItem(book.book.ISBN, 'true');
    } else {
      const index = favoriteBooks.value.findIndex(b => b.book.ISBN === book.book.ISBN);
      if (index !== -1) {
        favoriteBooks.value.splice(index, 1);
        localStorage.removeItem(book.book.ISBN);
      }
    }
  };

  // Cargar los libros favoritos del almacenamiento local al montar el componente
  onMounted(() => {
      for (const book of books) {
          const isFavorite = localStorage.getItem(book.book.ISBN);
          if (isFavorite === 'true') {
              favoriteBooks.value.push(book);
          }
      }
  });

  // Limpiar el almacenamiento local al desmontar el componente
  onUnmounted(() => {
      localStorage.clear();
  });

</script>

<template>
  <div class="bg-black p-8 text-white grid grid-cols-2">
    <div>
      <h1 class="mb-6 text-4xl font-bold">Librería📚</h1>
      <h1 class="mb-4">{{ filteredBooks.length }} Libros disponibles</h1>
      <div class="flex items-center space-x-4 mb-4">
        <div>
          <FilterGenre @genreFilter="handleGenreFilter"></FilterGenre>
        </div>
        <div>
          <FilterPages @pagesFilter="handlePagesFilter"></FilterPages>
        </div>
      </div>
      <div class="mt-4">
        <h3>Pulsa click sobre los libros para añadirlos a favoritos</h3>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-4 mr-4">
        <BookStar v-for="(book, index) in filteredBooks" :key="index"
        :book="book"
        @favorite-toggled="handleFavoriteToggled"
        ></BookStar>
      </div>
    </div>
    <div class="col-span-1">
      <div class="p-4 border border-gray-300 rounded-lg relative grid grid-cols-2 gap-4">
        <h1 class="text-4x1 font-bold col-span-2">Lista de lectura</h1>
        <div v-for="(book, index) in favoriteBooks" :key="index">
          <img :src="book.book.cover" alt="Portada del libro" class="mx-auto mb-4 w-40 h-56 object-cover">
          <h2 class="text-xl font-semibold text-white">Título: {{ book.book.title }}</h2>
          <p class="text-gray-600 text-white">Género: {{ book.book.genre }}</p>
          <p class="mt-2 text-white">Autor: {{ book.book.author.name }}</p>
          <p class="text-white">Páginas: {{ book.book.pages }}</p>
          <p class="text-white">Año: {{ book.book.year }}</p>
          <p class="text-white">ISBN: {{ book.book.ISBN }}</p>
          <p class="text-white">Sinopsis: {{ book.book.synopsis }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Comic+Sans+MS&display=swap');
</style>

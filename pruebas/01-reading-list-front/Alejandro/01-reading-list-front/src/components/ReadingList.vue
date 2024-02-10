<script setup lang="ts">
  import { defineEmits } from 'vue';

  const emit = defineEmits(['addBookToReadingList']);

  const agregarLibroALista = (book: any) => {
    emit('addBookToReadingList', book);
  };
</script>

<template>
  <div>
    <h2 class="text-white font-semibold mb-4">Agregar Libro a la Lista de Lectura</h2>
    <select v-model="selectedBook" class="block w-full p-2 mb-4 bg-white text-black rounded">
      <option disabled value="">Selecciona un libro</option>
      <option v-for="(book, index) in filteredBooks" :key="index" :value="book">{{ book.book.title }}</option>
    </select>
    <button @click="agregarLibroALista(selectedBook)" class="bg-blue-500 text-white px-4 py-2 rounded">Agregar a Lista</button>
  </div>
</template>

<style scoped>
/* Agrega estilos específicos si es necesario */
</style>

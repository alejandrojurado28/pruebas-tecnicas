<script setup lang="ts">
  import 'tailwindcss/tailwind.css';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const searchItem = '';
  let showError = false; // Variable para controlar si se muestra el mensaje de error

  const search = () => {
    if (searchItem.trim() !== '') {
      router.push({ name: 'resultados', query: { q: searchItem.trim() } });
    } else {
      showError = true; // Mostrar el mensaje de error si no se ingresa ningún término de búsqueda
    }
  }

  const furgo = '/public/furgoneta.png';
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="text-center">
      <img class="mx-auto mb-4" :src="furgo" alt="imagen">
      <h1 class="text-4xl mb-3 font-bold">Bazar Online</h1>
      <input type="text" name="buscador" id="buscador" placeholder="laptops, smartphones, ...🔎" class="mx-auto mb-4 w-full px-4 py-2 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200">
      <button @click="search" class="px-4 py-2 rounded-lg bg-pink-500 text-white font-bold">Buscar</button>
    </div>
  </div>
</template>

<style scoped>

</style>

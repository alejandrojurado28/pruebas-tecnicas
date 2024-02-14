<script setup lang="ts">
  import 'tailwindcss/tailwind.css';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const furgo = '/public/furgoneta.png';

  const resultadoBusqueda = '';

  /*const irAResultados = () => {
    router.push({path: '/items', query: { q: resultadoBusqueda.trim() }});
  }*/

  const busqueda = () => {
    //if (resultadoBusqueda.trim() !== '') {
      router.push({ path: '/items', query: { search: resultadoBusqueda.trim() }});
    //}
  }
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="text-center">
      <img class="mx-auto mb-4" :src="furgo" alt="imagen">
      <h1 class="text-4xl mb-3 font-bold">Bazar Online</h1>
      <input v-model="resultadoBusqueda" type="text" name="buscador" id="buscador" placeholder="laptops, smartphones, ...🔎" class="mx-auto mb-4 w-full px-4 py-2 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200">
      <button @click="busqueda" class="px-4 py-2 rounded-lg bg-pink-500 text-white font-bold">Buscar</button>
    </div>
  </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
  import 'tailwindcss/tailwind.css';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const furgo = '/public/furgoneta.png';

  const resultadoBusqueda = ref('');

  // Función para realizar la búsqueda y redirigir al usuario a la página de resultados
  const busqueda = () => {
    console.log("Resultado de la búsqueda:", resultadoBusqueda);
    if (resultadoBusqueda.value !== '') {
      console.log("Realizando la búsqueda...");
      router.push({ name: 'Items', query: { search: resultadoBusqueda.value }});
    } else {
      console.log("El término de búsqueda está vacío.");
    }
  }
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="text-center">
      <img class="mx-auto mb-4" :src="furgo" alt="imagen">
      <h1 class="text-4xl mb-3 font-bold">Bazar Online</h1>
      <input v-model="resultadoBusqueda" type="text" name="buscador" id="buscador" placeholder="laptops, smartphones, ...🔎" class="mx-auto mb-4 w-full px-4 py-2 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200">
      <button @click="busqueda" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Buscar</button>
    </div>
  </div>
</template>

<style scoped>

</style>

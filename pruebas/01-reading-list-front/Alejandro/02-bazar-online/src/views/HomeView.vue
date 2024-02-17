<script setup lang="ts">
  import 'tailwindcss/tailwind.css';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const furgo = '/public/furgoneta.png';

  const resultadoBusqueda = ref('');
  const busquedaValida = ref(true)

  // Función para realizar la búsqueda y redirigir al usuario a la página de resultados
  const busqueda = () => {
    console.log("Resultado de la búsqueda:", resultadoBusqueda);
    if (resultadoBusqueda.value !== '') {
      console.log("Realizando la búsqueda...");
      router.push({ name: 'Items', query: { search: resultadoBusqueda.value }});
      busquedaValida.value = true;
    } else {
      console.log("El término de búsqueda está vacío.");
      busquedaValida.value = false;
    }
  }
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="text-center">
      <img class="mx-auto mb-4" :src="furgo" alt="imagen">
      <h1 class="text-4xl mb-3 font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Bazar Online</h1>
      <input v-model="resultadoBusqueda" type="text" name="buscador" id="buscador" placeholder="laptops, smartphones, ...🔎" class="mx-auto mb-4 w-full px-4 py-2 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200">
      <button @click="busqueda" class="mb-4 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Buscar</button>
      <div v-if="!busquedaValida" class="bg-pink-100 border-t-4 border-pink-500 rounded-b text-pink-900 px-4 py-3 shadow-md" role="alert">
      <div class="flex">
        <div class="py-1"><svg class="fill-current h-6 w-6 text-pink-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
        <div>
          <p class="font-bold">Campo de búsqueda vacío.</p>
          <p class="text-sm">Busca algún producto de su interés.</p>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>

</style>

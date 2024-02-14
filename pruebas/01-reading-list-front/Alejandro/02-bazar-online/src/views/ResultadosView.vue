<script setup lang="ts">
  import 'tailwindcss/tailwind.css';
  import { ref, defineProps, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import productsData from '../assets/products.json';
  import router from '@/router';

  // Define una interfaz para representar la estructura del objeto book
  interface Producto {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

  interface ProductsData {
    products: Producto[];
    total: number;
    skip: number;
    limit: number;
  }

  const furgo = '/public/furgoneta.png';
  const productos = ref([]);
  const searchQuery = ref('');

  const route = useRoute();

  // Filtrar productos por título
  const productosFiltrados = ref<Producto[]>([]);
  onMounted(() => {
    const query = route.query.search as string;
    if (query) {
      productosFiltrados.value = productsData.products.filter(producto => {
        return producto.title.toLowerCase().includes(query.toLowerCase());
      });
    }
  });

  const buscar = () => {
  productosFiltrados.value = productsData.products.filter(producto => {
    return producto.title.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
};

</script>

<template>
  <div class="mt-4 fuente flex content-center justify-center font-serif">
    <img width="60px" :src="furgo" alt="img_furgoneta">
    <input v-model="searchQuery" class=" ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text">
    <button @click="buscar" class="px-4 py-2 rounded-lg bg-pink-500 text-white font-bold ml-4">Buscar</button>
  </div>
  <p class="text-center">Resultados de búsqueda de "{{ route.query.search }}": {{ productosFiltrados.length }}</p>
  <div>
    <div v-if="productosFiltrados.length === 0" class="text-center">No se encontraron productos para su busqueda</div>
    <div v-else class=" ml-6 mr-6 grid justify-items-center gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      <div class="flex justify-center mt-10 mx-auto" v-for="producto in productosFiltrados" :key="producto.id">
        <img class="rounded-full w-40 h-40" :src="producto.thumbnail" :alt="producto.title">
        <div class="block ml-4">
          <h2>{{ producto.title }}</h2>
          <p class="whitespace-pre-line">{{ producto.description }}</p>
          <p>{{ producto.price }} €</p>
          <p>{{ producto.rating }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

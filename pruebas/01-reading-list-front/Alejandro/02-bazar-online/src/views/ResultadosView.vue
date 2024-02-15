<script setup lang="ts">
  import 'tailwindcss/tailwind.css';
  import { ref, defineProps, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import productsData from '../assets/products.json';
  import axios from 'axios';

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
  const productos = ref<Producto[]>([]);
  const searchQuery = ref('');
  const productosFiltrados = ref<Producto[]>([]);

  const route = useRoute();
  const router = useRouter()

  const fetchData = async () => {
    try {
      const response = await axios.get('https://productos-5248a-default-rtdb.europe-west1.firebasedatabase.app/products.json');
      productos.value = Object.values(response.data);
      filterProducts(route.query.search as string);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterProducts = (searchQuery: string) => {
    productosFiltrados.value = productos.value.filter(producto => {
      return producto.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };
  
  const buscar = () => {
    productosFiltrados.value = productos.value.filter(producto => {
      return producto.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
  };

  const verDetallesProducto = (productoId: number) => {
    router.push({ name: 'Detalles', params: { id: productoId } })
  }

  onMounted(() => {
    fetchData();
  });
</script>

<template>
  <div class="mt-4 fuente flex content-center justify-center font-serif">
    <img width="60px" :src="furgo" alt="img_furgoneta">
    <input v-model="searchQuery" class=" ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text">
    <button @click="buscar" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Buscar</button>
  </div>
  <p class="text-center">Resultados de búsqueda de "{{ route.query.search }}": {{ productosFiltrados.length }}</p>
  <div>
    <div v-if="productosFiltrados.length === 0" class="text-center">No se encontraron productos para su busqueda</div>
    <div v-else class=" ml-6 mr-6 grid justify-items-center gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      <div @click="verDetallesProducto(producto.id)" class="flex justify-center mt-10 mx-auto" v-for="(producto, index) in productosFiltrados" :key="producto.id">
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

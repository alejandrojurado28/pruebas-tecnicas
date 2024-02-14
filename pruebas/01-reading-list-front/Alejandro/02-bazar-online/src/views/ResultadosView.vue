<script setup lang="ts">
  import 'tailwindcss/tailwind.css';
  import { ref, defineProps, onMounted } from 'vue';
  import productsData from '../assets/products.json';
  import router from '@/router';

  // Define una interfaz para representar la estructura del objeto book
  interface Producto {
    producto: {
      id: number;
      title: number;
      description: string;
      price: number;
      discountPercentage: number;
      rating: number;
      stock: number;
      brand: string;
      thumbnail: string;
      images: string[];
    };
  }

  const furgo = '/public/furgoneta.png';
  const productos: Ref<Producto[]> = ref([]);

  const props = defineProps({
    query: String
  });

  // Filtrar productos basados en el término de búsqueda
  const filtrarProductos = () => {
    productos.value = productsData.products.filter(producto =>
      producto.title.toLowerCase().includes(props.query.toLowerCase())
    );
  };

  // Llamar a la función de filtrado cuando se monte el componente
  onMounted(() => {
    filtrarProductos();
  })

</script>

<template>
  <div class="flex content-center justify-center">
    <img width="60px" :src="furgo" alt="img_furgoneta">
    <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" value="">
  </div>
  <p class="text-center">Resultados de búsqueda de "{{ props.query }}":</p>
  <div>
    
  </div>
</template>

<style scoped>

</style>

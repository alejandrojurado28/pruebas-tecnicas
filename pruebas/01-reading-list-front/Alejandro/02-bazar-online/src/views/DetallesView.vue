<script setup lang="ts">
    import { ref, onMounted, defineProps } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
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

    // Definir un ref para almacenar los detalles del producto
    const producto = ref<Producto>({
        id: 0,
        title: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        images: []
    });

    const obtenerDetallesProducto = async (productoId: number) => {
    try {
        const response = await axios.get(`https://productos-5248a-default-rtdb.europe-west1.firebasedatabase.app/products/${productoId-1}.json`);
        producto.value = response.data;
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
    };

    const route = useRoute();

    onMounted(() => {
        const productId = Number(route.params.id);
        obtenerDetallesProducto(productId);
    });
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="p-8 rounded-t-lg" :src="producto.thumbnail" :alt="producto.title" />
            </a>
            <div class="flex mb-4 ml-4 mr-4">
                <div v-for="(image, index) in producto.images" :key="index">
                    <img :src="image" alt="Imagen-producto" class="rounded-full w-20 h-20">
                </div>
            </div>
            <div class="px-5 pb-5">
                <a href="#">
                    <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ producto.title }}</h5>
                    <p class="text-xs font-semibold tracking-tight text-gray-900 dark:text-white">{{ producto.description }}</p>
                </a>
                <div class="flex items-center mt-2.5 mb-5">
                    <div class="flex items-center space-x-1 rtl:space-x-reverse">
                        <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <!-- Resto de los SVG -->
                    </div>
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{{ producto.rating }}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ producto.price }} €</span>
                    <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                </div>
            </div>
        </div>
    </div>
</template>
  

<style scoped>

</style>
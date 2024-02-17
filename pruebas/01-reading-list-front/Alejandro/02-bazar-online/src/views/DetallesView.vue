<script setup lang="ts">
    import { ref, onMounted, defineProps, defineEmits } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import axios from 'axios';

    const carrito = '/public/Shopping_cart.png';
    const imgBasura = '/public/eliminar.png';
    const router = useRouter();
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
        cantidad: number;
        nuevoprecio: number;
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
        images: [],
        cantidad: 1,
        nuevoprecio: 0
    });

    const furgo = '/public/furgoneta.png';
    const productosCarrito = ref<Producto[]>([]);
    const mostrarProdsCarrito = ref(false);
    const totalPrecio = ref<number>(0);
    const totalCarrito = ref<number>(0);
    const deshabilitarAnadir = ref(false);

    const volverAlHome = () => {
        router.push({ name: 'home' });
    }

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
        cargarProductosDesdeLocalStorage();
    });

    const agregarAlCarrito = (producto: Producto) => {
        // Clonar el producto para evitar referencias
        const productoClonado = {...producto};
        // Establecer la cantidad del producto clonado a 1
        productoClonado.cantidad = 1;
        // Actualizar el precio del producto clonado con el nuevo precio
        productoClonado.nuevoprecio = productoClonado.price;
        // Agregar el producto clonado al carrito
        productosCarrito.value.push(productoClonado);
        // Actualizar el total del carrito
        totalCarrito.value += productoClonado.price;
        // Actualizar el total del precio
        totalPrecio.value += productoClonado.price;
        deshabilitarAnadir.value = productoClonado.cantidad === 1
        // Actualizar el local storage
        actualizarLocalStorage();
    }

    const actualizarLocalStorage = () => {
        localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito.value));
    }

    const cargarProductosDesdeLocalStorage = () => {
        const productosGuardados = localStorage.getItem('productosCarrito');
        const cantidadesGuardadas = localStorage.getItem('totalCarrito');
        if (productosGuardados) {
            productosCarrito.value = JSON.parse(productosGuardados);
        }
        if (cantidadesGuardadas) {
            totalCarrito.value = parseFloat(cantidadesGuardadas);
        }
    }
    const obtenerPrecioTotal = () => {
        totalPrecio.value = productosCarrito.value.reduce((total, producto) => total + producto.nuevoprecio, 0);
        return totalPrecio;
    }

    const eliminarDelCarrito = (productoEliminar: Producto) => {
        const indice = productosCarrito.value.findIndex(producto => producto.id === productoEliminar.id);
        if (indice !== -1) {
            productosCarrito.value.splice(indice, 1);
            actualizarLocalStorage();
        }
    }

    const dibujarEstrellas = (puntuacion: number) => {
        const estrellas = [];
        for (let i = 0; i < puntuacion; i++) {
            estrellas.push(i);
        }
        return estrellas;
    }

    const aumentarCantidad = (productoAnadir: Producto) => {
        const indice = productosCarrito.value.findIndex(producto => producto.id === productoAnadir.id);
        if (indice !== -1) {
            // Actualizar la cantidad y el nuevo precio
            productosCarrito.value[indice].cantidad++;
            productosCarrito.value[indice].nuevoprecio += productoAnadir.price;
            // Actualizar el total del carrito
            totalCarrito.value += productoAnadir.price;
            // Sumar el precio del producto al totalPrecio
            totalPrecio.value += productoAnadir.price;
            localStorage.setItem('totalCarrito', totalCarrito.value.toString());
            // Actualizar el local storage
            actualizarLocalStorage();
        }
    }

    const disminuirCantidad = (productoDisminuir: Producto) => {
        const indice = productosCarrito.value.findIndex(producto => producto.id === productoDisminuir.id);
        if (indice !== -1) {
            if (productosCarrito.value[indice].cantidad > 1) {
                // Restar la cantidad y el precio del producto
                productosCarrito.value[indice].cantidad--;
                productosCarrito.value[indice].nuevoprecio -= productoDisminuir.price;
                // Actualizar el total del carrito
                totalCarrito.value -= productoDisminuir.price;
                // Actualizar el total del precio
                totalPrecio.value -= productoDisminuir.price;
                // Actualizar el local storage
                actualizarLocalStorage();
            }
        }
    }
    
</script>

<template>
    <div class="mb-2 mt-4 fuente flex content-center justify-center font-serif w-auto h-auto">
        <img @click="volverAlHome" width="60px" :src="furgo" alt="img_furgoneta">
        <input v-model="resultadoBusqueda" class="mr-4 ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text">
        <button @click="busqueda" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Buscar</button>
    </div>
    <div class="flex justify-center items-center min-h-screen">
        <div class="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="p-8 rounded-t-lg" :src="producto.thumbnail" :alt="producto.title" />
            </a>
            <div class="flex mb-4 ml-4 mr-4">
                <div class="mr-4" v-for="(image, index) in producto.images" :key="index">
                    <img :src="image" alt="Imagen-producto" class="rounded-full w-20 h-20">
                </div>
            </div>
            <div class="px-5 pb-5">
                <a href="#">
                    <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ producto.title }}</h5>
                    <p class="text-xs font-semibold tracking-tight text-gray-900 dark:text-white">{{ producto.description }}</p>
                </a>
                <div class="flex items-center mt-2.5 mb-5">
                    <div v-for="estrella in dibujarEstrellas(Math.round(producto.rating))" class="flex items-center space-x-1 rtl:space-x-reverse">
                        <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <!-- Resto de los SVG -->
                    </div>
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{{ producto.rating }}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ producto.price }} €</span>
                    <button @click="agregarAlCarrito(producto)" :disabled="deshabilitarAnadir" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Añadir al carrito</button>
                </div>
                
            </div>
        </div>
    </div>

    <div class="">
        <img width="60px" :src="carrito" alt="" class="absolute top-0 right-0 mt-4 mr-4" @click="mostrarProdsCarrito = !mostrarProdsCarrito">
        <div v-if="mostrarProdsCarrito" class=" absolute top-0 right-0 mt-4 mr-4container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 class="text-2xl font-bold my-4">Cesta de la compra</h1>
    </div>
    <div v-for="prodCarrito in productosCarrito" :key="prodCarrito.id" class="mt-8">
        <div class="flex flex-col md:flex-row border-b border-gray-400 py-4">
            <div class="flex-shrink-0">
                <img :src="prodCarrito.thumbnail" :alt="prodCarrito.title" class="w-32 h-32 object-cover">
            </div>
            <div class="mt-4 md:mt-0 md:ml-6">
                <h2 class="text-lg font-bold">{{ prodCarrito.title }}</h2>
                <div class="mt-4 flex items-center">
                    <span class="mr-2 text-gray-600">Cantidad:</span>
                    <div class="flex items-center">
                        <button @click="disminuirCantidad(prodCarrito)" class="bg-gray-200 rounded-l-lg px-2 py-1">-</button>
                        <span class="mx-2 text-gray-600">{{ prodCarrito.cantidad }}</span>
                        <button @click="aumentarCantidad(prodCarrito)" class="bg-gray-200 rounded-r-lg px-2 py-1">+</button>
                    </div>
                    <span class="ml-2 font-bold">{{ prodCarrito.price }} €</span>
                </div>
                <img @click="eliminarDelCarrito(prodCarrito)" class="mt-3" width="20px" :src="imgBasura" alt="eliminar_producto">
            </div>
        </div>
    </div>
    <div class="flex justify-end items-center mt-8">
        <span class="text-gray-600 mr-4">Total:</span>
        <span class="text-xl font-bold">{{ obtenerPrecioTotal() }} €</span>
    </div>
    </div>
    <!--<div v-else>
        <h2>Cart is empty</h2>
    </div> -->
    </div>
</template>
  
  

<style scoped>

</style>
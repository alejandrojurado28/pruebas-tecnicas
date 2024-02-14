<script setup lang="ts">
    import { defineProps } from 'vue';

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

    const props = defineProps<{
        product: Producto;
    }>();
</script>

<template>
    <div class="product-details">
    <h2>{{ product.title }}</h2>
    <p>{{ product.description }}</p>
    <p>Price: {{ product.price }}</p>
    <p>Rating: {{ product.rating }}</p>
    <!-- Mostrar más detalles según sea necesario -->
    </div>
</template>

<style scoped>

</style>
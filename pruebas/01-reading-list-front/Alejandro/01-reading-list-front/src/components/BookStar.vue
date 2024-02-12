<script setup lang="ts">
    import { defineProps, ref, onMounted } from 'vue';

    const props = defineProps({
        book: {
            type: Object,
            required: true
        }
    });

    const isFavorite = ref(false);

    const toggleFavorite = () => {
        isFavorite.value = !isFavorite.value;
        localStorage.setItem(`favorite_${props.book.book.ISBN}`, JSON.stringify(isFavorite.value));
    };

    onMounted(() => {
        const storedFavorite = localStorage.getItem(`favorite_${props.book.book.ISBN}`);
        if (storedFavorite !== null) {
            isFavorite.value = JSON.parse(storedFavorite);
        }
    });
</script>

<template>
    <div @click="toggleFavorite" class="p-4 border border-gray-300 rounded-lg relative">
      <img :src="book.book.cover" alt="Portada del libro" class="mx-auto mb-4 w-40 h-56 object-cover">
      <h2 class="text-xl font-semibold text-white">Título: {{ book.book.title }}</h2>
      <span v-if="isFavorite" class="absolute top-0 right-0 text-yellow-500 text-xl">⭐️</span>
      <p class="text-gray-600 text-white">Género: {{ book.book.genre }}</p>
      <p class="mt-2 text-white">Autor: {{ book.book.author.name }}</p>
      <p class="text-white">Páginas: {{ book.book.pages }}</p>
      <p class="text-white">Año: {{ book.book.year }}</p>
      <p class="text-white">ISBN: {{ book.book.ISBN }}</p>
      <p class="text-white">Sinopsis: {{ book.book.synopsis }}</p>
    </div>
</template>

<style scoped>

</style>
  

  
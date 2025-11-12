<template>
  <Edit :products="data" />
</template>

<script setup lang="ts">
import type { IProduct } from '~/types/request'

const route = useRoute();
const id = route.query.id as string

const data = ref<IProduct[]>([]);

// Проверяем localStorage
if (id) {
  const savedData = JSON.parse(localStorage.getItem('table-data') || '[]');
  const existing = savedData.find((item: any) => item.id === id);

  if (existing) {
    data.value = existing.products;
  } else {
    const { data: serverData } = await useFetch('/api/products');
    data.value = serverData.value || [];
  }
} else {
  const { data: serverData } = await useFetch('/api/products');
  data.value = serverData.value || [];
}

definePageMeta({
  isShow: false
})
</script>

<style module lang="scss"></style>
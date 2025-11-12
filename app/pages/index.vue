<template>
  <Main v-if="data" :requests="data"/>
</template>

<script setup lang="ts">
import type { IRequest } from '~/types/request';


const { data } = await useFetch<IRequest[]>('/api/table-data')

definePageMeta({
  isShow: true
})
</script>
$
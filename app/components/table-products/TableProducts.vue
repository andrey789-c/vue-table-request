<template>
  <Table :columns="['Название', 'Количество', 'Цена', 'Цвет']" :class-name-top="$style.top">
    <TableProduct
      v-for="(product, i) in products"
      :key="product.id"
      :product="product"
      :error="errors[i]!"
    />
  </Table>
</template>

<script setup lang="ts">
import type { IError, IProduct } from '~/types/request';
import Table from '../table/Table.vue';
import TableProduct from './TableProduct.vue';

interface IProps {
  products: IProduct[]
  errors: IError[]
}

const props = defineProps<IProps>()



</script>

<style lang="scss" module>
.top {
  grid-template-columns: repeat(4, 1fr) !important;
}
</style>
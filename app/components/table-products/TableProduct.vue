<template>
  <div :class="$style.row">
    <div :class="$style.row__item">{{ product.name }}</div>
    <div :class="$style.row__item">
      <Input v-model:modelValue="product.quantity" :error="error.quantity" placeholder="0" />
    </div>
    <div :class="$style.row__item">
      <Input :error="error.price" v-model:modelValue="product.price" placeholder="0.00" />
    </div>
    <div :class="$style.row__item">
      <Select v-model:modelValue="product.model" :options="product.options" :error="error.model"/>
    </div>
  </div>

</template>

<script setup lang="ts">
import type { IError, IProduct } from '~/types/request';
import Input from '../Input.vue';
import Select from '../Select.vue';

interface IProps {
  product: IProduct
  error: IError
}

const props = defineProps<IProps>()

</script>

<style module lang="scss">
.row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  &__item {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    font-size: 14px;
    line-height: 20px;
    color: #4E4E4E;

    &:not(:last-child) {
      border-bottom: 1px solid #EEEEEE;
    }
  }
}
</style>
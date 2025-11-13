<template>
  <div class="main">
    <div class="main__top">
      <NuxtLink to="/" class="main__icon">
        <IconsBackIcon />
      </NuxtLink>
      <div class="main__title">Товары</div>
    </div>
    <div class="main__content">
      <div :class="$style.action">
        <button @click="submit" :class="[$style.button, {[$style.disabled]: isSubmit}]" :disabled="isSubmit">Сохранить</button>
      </div>
      <TableProducts :products="products" :errors="errors" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IError, IProduct } from '~/types/request';
import TableProducts from './table-products/TableProducts.vue';
import { reactive, ref } from 'vue';

interface IProps {
  products: IProduct[]
}

const props = defineProps<IProps>()

const route = useRoute();
const router = useRouter()
const id = route.query.id as string;

const products = reactive(props.products);
const isSubmit = ref(false)

const errors: IError[] = reactive(products.map(() => ({
  quantity: false,
  price: false,
  model: false
})))

const submit = () => {

  let valid = true;

  isSubmit.value = true

  const quantityRegex = /^\d+$/;
  const priceRegex = /^\d+(\.\d+)?$/;

  products.forEach((p, i) => {
    if (errors[i]) {
      errors[i].quantity = !quantityRegex.test(String(p.quantity));
      errors[i].price = !priceRegex.test(String(p.price));
      errors[i].model = !p.options.find(option => option.value === p.model)
    }

    if (!p.quantity || !p.price || !p.model) valid = false;
  })


  if (!valid) {
    setTimeout(() => isSubmit.value = false, 3000)
    
    return;
  }

  const savedData = JSON.parse(localStorage.getItem('table-data') || '[]');

  const existingIndex = savedData.findIndex((item: any) => item.id === id);

  if (existingIndex !== -1) {
    savedData[existingIndex].products = products;
  } else {
    savedData.push({ id, products });
  }

  localStorage.setItem('table-data', JSON.stringify(savedData));


  router.push('/')
  isSubmit.value = false

}

</script>

<style module lang="scss">
.action {
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 20px;

  .button {
    border: 0;
    padding: 9px 37.5px;
    background: linear-gradient(101.36deg, #FC8507 0%, #FFA218 100%);
    font-weight: 700;
    font-size: 14px;
    line-height: 130%;
    color: #ffffff;
    border-radius: 8px;
    cursor: pointer;

    &.disabled {
      background: #F2F2F2;
      color: #AFAFAF;
    }
  }
}
</style>
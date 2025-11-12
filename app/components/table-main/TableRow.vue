<template>
  <div :class="[$style.row, { [$style.active]: isSubmit }]">
    <div :class="[$style.row__article, $style.row__item]">{{ request.name }}</div>
    <div :class="[$style.row__status, $style.row__item]"><span>{{ request.status }}</span></div>
    <div :class="[$style.row__result, $style.row__item]">{{ request.result }}</div>
    <div :class="[$style.row__date, $style.row__item]">{{ request.date }}</div>
    <div :class="[$style.row__action, $style.row__item]">
      <nuxt-link v-if="!isSubmit" :to="{ name: 'edit', query: { id: request.id } }"
        :class="$style.row__edit">Редактировать</nuxt-link>
      <button @click="onHandleSubmit" :class="$style.row__submit" v-else>Отправить</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import type { IRequest } from '~/types/request';


interface IProps {
  request: IRequest
}

const isSubmit = ref(false)

onMounted(() => {
  const localData = JSON.parse(localStorage.getItem('table-data') || '[]');

  watch(
    () => props.request?.id,
    (id) => {
      if (!id) return;
      const existing = localData.find((item: any) => String(item.id) === String(id));
      isSubmit.value = !!existing;
    },
    { immediate: true }
  );
});

const emit = defineEmits<{
  (e: 'update'): void
}>();

const onHandleSubmit = async () => {

  const localData = JSON.parse(localStorage.getItem('table-data') || '[]');
  const productsData = localData.find((item: any) => String(item.id) === String(props.request.id));

  const res = await $fetch('/api/send', {
    method: 'POST',
    body: {
      id: props.request.id,
      products: productsData.products
    }
  })

  if (res.success) {
    const updatedData = localData.filter(
      (item: any) => String(item.id) !== String(props.request.id)
    );

    localStorage.setItem('table-data', JSON.stringify(updatedData));
    isSubmit.value = false
  }
}

const props = defineProps<IProps>()
</script>


<style lang="scss" module>
.row {
  display: grid;
  grid-template-columns: repeat(4, 1fr) 158px;

  &:not(:last-child) {
    border-bottom: 1px solid #eeeeee;
  }

  &.active {
    background-color: #FFF7DAB2;
  }

  &__item {
    padding: 20px;
    font-size: 16px;
    line-height: 24px;
    color: #4E4E4E;
  }

  &__status {
    span {
      width: fit-content;
      display: block;
      background-color: #EBFFED;
      padding: 4px 8px;
      font-size: 12px;
      line-height: 130%;
      font-weight: 700;
      border-radius: 4px;
      color: #30B25D;
    }
  }

  &__result {
    color: #8C8C8C;
  }

  &__action {
    padding: 16px 24px 12px 20px;

    button,
    a {
      width: 114px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
    }
  }

  &__edit {
    border: 1px solid #D9D9D9;

    font-size: 14px;
    line-height: 20px;
    color: #333333;
    text-decoration: none;
  }

  &__submit {
    background: linear-gradient(101.36deg, #FC8507 0%, #FFA218 100%);
    font-weight: 700;
    font-size: 14px;
    line-height: 130%;
    color: #ffffff;
    border: 0;
    cursor: pointer;
  }
}
</style>
<!-- Таблица на главной странице -->

<template>
  <div :class="$style.table">
    <div :class="[$style.table__top, classNameTop]">
      <div v-for="column in columns" :key="column" :class="$style.table__item">{{ column }}</div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">

interface IProps {
  columns: string[]
  classNameTop?: string
}

const { columns, classNameTop } = defineProps<IProps>()

</script>

<style module lang="scss">
.table {
  border-radius: 16px;
  border: 1px solid #EEEEEE;

  &__top {
    background-color: #F7F7F7;
    display: grid;
    grid-template-columns: repeat(4, 1fr) 158px;
    border-bottom: 1px solid #D9D9D9;
  }

  &__item {
    padding: 15px 20px;
    font-size: 14px;
    line-height: 130%;
    font-weight: 700;
    color: #8C8C8C;
  }
}
</style>
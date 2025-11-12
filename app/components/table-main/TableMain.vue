<!-- Таблица на главной странице -->

<template>
  <div>
    <Table :columns="['Номер', 'Статус', 'Результат', 'Дата', 'Действие']">
      <TableRow v-for="request in props.requests" :key="request.id" :request="request"  />
    </Table>
  </div>
</template>


<script setup lang="ts">
import type { IRequest } from '~/types/request';
import TableRow from './TableRow.vue';

interface IProps {
  requests: IRequest[]
}

const props = defineProps<IProps>()

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
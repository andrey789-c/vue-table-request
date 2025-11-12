<template>
  <div class="main">
    <div class="main__top">
      <h3 class="main__title">Заявки</h3>
    </div>
    <div class="main__content">
      <TableMain :requests="requests" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IRequest } from '~/types/request';

interface IProps {
  requests: IRequest[]
}

const props = defineProps<IProps>()
</script>

<style module lang="scss">
.main {
  background-color: #ffffff;
  height: 100%;
  border-radius: 16px;
  box-shadow: 0 2px 1px 0 #0000001a;

  &__top {
    padding: 16px 24px;
    border-bottom: 1px solid #EEEEEE;
    margin-bottom: 24px;
  }

  &__title {
    padding: 2.5px 0;
    font-size: 24px;
    line-height: 130%;
    font-weight: 700;
  }

  &__content {
    padding: 0 24px;
  }
}
</style>
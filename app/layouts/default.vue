<template>
  <div :class="[$style.wrapper, { [$style.withSidebar]: $route.meta.isShow, [$style.collapsed]: isCollapsed }]">
    <Sidebar v-if="$route.meta.isShow" :isCollapsed="isCollapsed" :toggle-sidebar="toggleSidebar" />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '~/components/Sidebar.vue';

const isCollapsed = ref(false)
const toggleSidebar = () => (isCollapsed.value = !isCollapsed.value)
</script>

<style module lang="scss">
.wrapper {
  display: grid;
  padding: 24px 20px;
  height: 100vh;

  &.withSidebar {
    grid-template-columns: 280px 1fr;
    gap: 12px;
    transition: .3s;

    &.collapsed {
      grid-template-columns: 68px 1fr;
      gap: 12px;
    }
  }
}
</style>
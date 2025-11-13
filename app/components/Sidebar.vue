<template>
  <aside :class="[$style.sidebar, { [$style.collapsed]: isCollapsed }]">
    <div :class="$style.sidebar__top">
      <button @click="toggleSidebar" :class="$style.sidebar__back">
        <LazyIconsArrowIcon />
      </button>
    </div>

    <div :class="$style.sidebar__links">
      <div :class="[$style.sidebar__link, { [$style.active]: $route.path === '/' }]">
        <div :class="[$style.sidebar__icon, $style['request-icon'], { [$style.collapsed]: isCollapsed }]">
          <LazyIconsRequestsIcon />
        </div>

        <div v-if="!isCollapsed" :class="$style.sidebar__text">Заявки</div>

      </div>
    </div>
  </aside>
</template>

<script setup>
const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false,
  },
  toggleSidebar: {
    type: Function,
    required: true,
  },
})
</script>

<style module lang="scss">
.sidebar {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 1px 0 #0000001a;
  transition: .3s;

  &.collapsed {
    width: 68px;

    .sidebar__text {
      display: none;
    }

    .sidebar__back {
      transform: rotate(180deg);
    }
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 68px;
    padding: 0 18px;
  }

  &__back {
    width: 36px;
    height: 36px;
    margin-bottom: 8px;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  &__links {
    padding: 12px 0;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    position: relative;
    border-left: 2px solid #fc8507;
    cursor: pointer;
    transition: color 0.2s ease;

    &.active {
      .request-icon path {
        fill: #fc8507;
      }

      .sidebar__text {
        color: #fc8507;
      }
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;

    &.collapsed {
      width: 36px;
      height: 36px;
      background-color: #FFF7DAB2;
      border-radius: 8px;
    }
  }

  &__text {
    font-size: 16px;
    line-height: 24px;
    color: #000;
    transition: color 0.2s ease;
  }
}
</style>
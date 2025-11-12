<template>
  <div :class="$style.select" ref="selectRef">
    <div :class="[$style.select__box, { [$style.open]: isOpen, [$style.error]: error }]" @click="toggleDropdown">
      <span :class="[$style.select__label, { [$style.empty]: !selectedLabel }]">{{ selectedLabel || 'Select' }}</span>
      <button :class="[$style.select__arrow, { [$style.rotate]: isOpen }]">
        <icons-select-icon />
      </button>
    </div>

    <transition name="select-fade">
      <div v-if="isOpen" :class="$style.select__dropdown">
        <div v-for="option in options" :key="option.value" :class="[
          $style.select__option,
          option.value === modelValue ? $style['select__option--active'] : ''
        ]" @click="selectOption(option)">
          <span>{{ option.label }}</span>
          <span v-if="option.value === modelValue" :class="$style.select__check">
            <icons-tick-icon />
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { IOption } from '~/types/request';

interface IProps {
  modelValue: string
  options: IOption[]
  error: boolean
}

const props = defineProps<IProps>()

const emit = defineEmits(['update:modelValue'])
const isOpen = ref(false)
const selectRef = ref(null)

const selectedLabel = computed(() => {
  return props.options.find(o => o.value === props.modelValue)?.label || ''
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: IOption) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

const handleClickOutside = (e: Event) => {
  const target = e.target as Node
  const selectEl = selectRef.value as null | HTMLElement
  if (selectEl && !selectEl.contains(target)) {
    isOpen.value = false
  }
}


onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style module lang="scss">
.select {
  position: relative;
  width: 100%;

  &__box {
    border: 1px solid #D9D9D9;
    border-radius: 8px;
    padding: 8px 12px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: border-color 0.2s ease;

    &:hover {
      border-color: #aaa;
    }

    &.open {
      border-color: #434242;
    }

    &.error {
      border-color: #FF5C52;
    }
  }

  &__label {
    font-size: 14px;
    line-height: 20px;
    color: #333333;

    &.empty {
      color: #8C8C8C;
    }
  }

  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s;
    width: 18px;
    height: 18px;
    background-color: transparent;
    border: 0;

    &.rotate {
      transform: rotate(-180deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    width: 220px;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    z-index: 10;
    padding: 8px;
    box-shadow: 0 3px 12px 0px #00000026;
  }

  &__option {
    padding: 12px 8px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background 0.2s;
    border-radius: 12px;
    font-size: 16px;
    line-height: 24px;


    &:hover {
      background: #f6f6f6;
    }

    &--active {
      color: #FC8507;
    }
  }

  &__check {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }
}

/* Анимация */
.select-fade-enter-active,
.select-fade-leave-active {
  transition: all 0.2s ease;
}

.select-fade-enter-from,
.select-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>

<template>
  <div :class=$style.wrapper>
    <input :class="[$style.input, {[$style.error]: error}]" :placeholder="placeholder" :value="modelValue" @input="onInput">
    <button @click="clear" :class="$style.clear"><IconsClearIcon /></button>
  </div>

</template>

<style lang="scss" module>
.wrapper {
  width: 100%;
  position: relative;

  .input {
    width: 100%;
    height: 36px;
    border-radius: 8px;
    padding: 8px 12px;
    border: 1px solid #D9D9D9;

    &.error {
      border-color: #FF5C52;
    }
  }
  .clear {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 8px;
    top: 9px;
    bottom: 9px;
    width: 18px;
    height: 18px;
    background-color: transparent;
    border: 0;
  }
}
</style>

<script setup lang="ts">
interface IProps {
  modelValue: string
  placeholder: string
  error: boolean
}

const props = defineProps<IProps>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
const clear = () => {
  emit('update:modelValue', '')
}

</script>

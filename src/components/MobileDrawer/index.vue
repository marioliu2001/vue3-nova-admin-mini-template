<script setup>
import { onUnmounted, watch } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  placement: { type: String, default: 'left' },
  duration: { type: String, default: '200' },
  width: { type: String, default: 'md' },
  height: { type: String, default: 'md' }
});

const emit = defineEmits(['update:modelValue', 'close']);

watch(
  () => props.modelValue,
  (val) => {
    val && emit('update:modelValue', val);
    document.body.style.overflow = val ? 'hidden' : 'auto';
  }
);

function close() {
  emit('update:modelValue', false);
  emit('close');
}

onUnmounted(() => {
  document.body.style.overflow = 'auto';
});
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-40" @click="close">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    <div
      v-bind="$attrs"
      class="fixed z-50 overflow-y-auto bg-white transition-all duration-200 dark:bg-[#141414]"
      :class="[
        `duration-${duration}`,
        {
          [`h-screen w-${width}`]: placement === 'right' || placement === 'left',
          [`w-full h-${width}`]: placement === 'top' || placement === 'bottom',

          '-left-full top-0': placement === 'left' && !modelValue,
          'left-0 top-0': placement === 'left' && modelValue,

          '-right-full top-0': placement === 'right' && !modelValue,
          'right-0 top-0': placement === 'right' && modelValue,

          '-top-full left-0': placement === 'top' && !modelValue,
          'top-0 left-0 ': placement === 'top' && modelValue,

          '-bottom-full left-0': placement === 'bottom' && !modelValue,
          'bottom-0 left-0': placement === 'bottom' && modelValue
        }
      ]"
    >
      <slot></slot>
    </div>
  </Teleport>
</template>

<style scoped></style>

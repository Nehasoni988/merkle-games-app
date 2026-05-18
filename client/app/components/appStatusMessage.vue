<script setup lang="ts">
interface Props {
  message?: string;
}

const props = withDefaults(defineProps<Props>(), {
  message:
    "Please wait, we are trying to fetch the information as soon as possible...",
});
</script>

<template>
  <div class="fetching-message">
    {{ props.message }}
  </div>
</template>
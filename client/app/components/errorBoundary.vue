<script setup lang="ts">
interface Props {
  componentName: string;
  errorMsg: string;
}
const props = defineProps<Props>();
</script>

<template>
  <div>
    <h5>Error while loading {{ componentName }}.vue</h5>
    <div>
      {{ errorMsg }}
    </div>
  </div>
</template>
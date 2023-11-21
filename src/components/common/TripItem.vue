<script setup>
const props = defineProps({
  place: Object
})
</script>

<template>
  <div class="col-3">
    <div>
      <img :src="place.firstImage" style="width: 120px; height: 120px display: block" />
    </div>
    <div>
      {{ place.title }}
    </div>
  </div>
</template>

<style scoped></style>

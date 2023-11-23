<script setup>
const props = defineProps({
  place: Object
})
</script>

<template>
  <div class="col">
    <div class="d-flex justify-content-center">
      <img
        :src="place.firstImage"
        style="width: 120px; height: 120px display: block"
        onerror="this.src='src/assets/img/planeIcon.png'"
      />
    </div>
    <div class="mt-3 d-flex justify-content-center">
      {{ place.title }}
    </div>
  </div>
</template>

<style scoped></style>

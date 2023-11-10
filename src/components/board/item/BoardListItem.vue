<script setup>
import { FwbA, FwbTableCell, FwbTableRow } from "flowbite-vue";
</script>

<template>
  <fwb-table-row>
    <fwb-table-cell>리스트 아이템임 ㅋ</fwb-table-cell>
    <fwb-table-cell
      ><router-link :to="{ name: 'board-view', params: { articleno: 1 } }">
        리스트 아이템임 ㅋ</router-link
      ></fwb-table-cell
    >
    <fwb-table-cell>리스트 아이템임 ㅋ</fwb-table-cell>
    <fwb-table-cell>리스트 아이템임 ㅋ</fwb-table-cell>
    <fwb-table-cell>
      <fwb-a href="#"> Edit </fwb-a>
    </fwb-table-cell>
  </fwb-table-row>
</template>

<style scoped></style>

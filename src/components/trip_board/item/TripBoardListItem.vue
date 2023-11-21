<script setup>
const props = defineProps({
  article: Object
})
</script>

<template>
  <tr class="text-center">
    <th scope="row">{{ article.articleNo }}</th>
    <td class="text-center">
      <router-link
        :to="{
          name: 'tboard-view',
          params: { articleno: article.articleNo, userId: article.userId }
        }"
        class="article-title link-dark"
      >
        {{ article.subject }}
      </router-link>
    </td>
    <td>{{ article.userId }}</td>
    <td>{{ article.hit }}</td>
    <td>{{ article.registerTime }}</td>
  </tr>
</template>

<style scoped></style>

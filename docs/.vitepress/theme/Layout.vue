<script setup>
import DefaultTheme from 'vitepress/theme'
import DiagramLightbox from './DiagramLightbox.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <DiagramLightbox />
    </template>
  </Layout>
</template>

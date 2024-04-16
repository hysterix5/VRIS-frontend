<template>
  <Welcome />
</template>

<script>
definePageMeta({
  layout: 'custom',
  middleware: ["auth"]
})
</script>


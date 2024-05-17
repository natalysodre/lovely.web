<template>
  <div class="layout-container">
    <Header />
  </div>

  <div class="content">
    <slot />
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");
.layout-container {
  position: relative;
  font-family: "Montserrat", sans-serif;
}

.content {
  margin-top: 100px;
  font-family: "Montserrat", sans-serif;
}
</style>

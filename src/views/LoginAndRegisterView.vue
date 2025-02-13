<template>
  <Container class="mt-20">
    <img decoding="async" class="mr-2 max-w-[350px]"
      src="https://shindiristudio.com/wp-content/uploads/2022/02/Development-Ninja.svg"
      alt="https://shindiristudio.com/wp-content/uploads/2022/02/Development-Ninja.svg">
    <LoginAndRegistrationForm class="mt-10" />
  </Container>
</template>

<script setup lang="ts">
import Container from '../components/UI/Container.vue';
import LoginAndRegistrationForm from '../components/forms/LoginAndRegistrationForm.vue';
</script>
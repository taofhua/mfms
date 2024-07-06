<template>
  <router-view></router-view>
</template>

<script>
import {useRouter } from 'vue-router';
export default {
  components: {
  },
  setup() {
    const router = useRouter();
    const navTo = (url) => {
      router.push(url);
    };
    return {
      navTo
    };
  },
}
</script>

<style>
</style>

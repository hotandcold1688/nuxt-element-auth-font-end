<template>
  <Login />
</template>

<script>
import Login from "@/components/Login";
export default {
  components: {
    Login
  },
  asyncData() {
     
    console.log("登录页面-asyncData");
  },
  mounted() {
    console.log("登录页面-mounted");
  }
};
</script>

<style scoped lang="scss">
</style>

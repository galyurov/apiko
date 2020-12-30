<template>
  <div>
    <app-bar-auth/>
    <router-view/>
  </div>
</template>

<script>
import AppBarAuth from "@/components/AppBarAuth";


export default {
  name: "AuthLayout",
  components: {
    AppBarAuth
  }
}
</script>

<style scoped>

</style>
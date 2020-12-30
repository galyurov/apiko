<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>

  </div>
</template>

<script>
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
  export default {
    components:{
      AuthLayout,
      MainLayout
    },
    computed:{
      layout(){
        return (this.$route.meta.layout || 'auth')+'-layout'
      }
    }
  }
</script>

<style lang="scss">
body{
  margin: 0;
  padding: 0;
}
</style>

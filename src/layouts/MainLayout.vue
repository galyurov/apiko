<template>
  <div >
    <app-bar-main/>
    <router-view/>
  </div>
</template>

<script>
import AppBarMain from "@/components/AppBarMain";
export default {
  name: "MainLayout",
  components: {AppBarMain},
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length){
      await this.$store.dispatch('fetchInfo')
    }
  }
}
</script>

<style scoped>

</style>
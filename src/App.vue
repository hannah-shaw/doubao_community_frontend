<template>
  <div>
    

    <div>
        <router-view :key="this.$route.fullPath"></router-view>
    </div>

    
  </div>
</template>

<script>


export default {
  name: "App",
  components: { },
};
</script>

<style scoped>

</style>

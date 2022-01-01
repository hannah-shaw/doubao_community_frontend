
<template>
  <div :class="'layout'">
    <v-nav></v-nav>
    <router-view :class="'router'"></router-view>
  </div>
</template>

<style scoped>
.layout {
  height: 100%;
}
.router {
  margin: 10px;
}
</style>

<script>
import nav from "@/components/admin/navMenu";
export default {
  components: {
    // 后台侧边栏
    "v-nav": nav,
  },
};
</script>
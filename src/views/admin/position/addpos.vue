<template>
  <div>
    <div>
      <p>新增避难所位置</p>
    </div>
    <v-add></v-add>
  </div>
</template>

<style scoped>
p{
  font-size: 24px;
  margin: 10px 20px;
  display: inline-block;
  font-weight: bold;
}
</style>

<script>
import addpos from "@/components/admin/position/addpos";
export default {
  components: {
    "v-add": addpos,
  },
};
</script>
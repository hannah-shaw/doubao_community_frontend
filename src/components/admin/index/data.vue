<template>
  <el-card class="box-card">
    <div :class="'title'">
      <i class="el-icon-s-marketing"></i>
      数据统计
    </div>
    <div :class="'wrap'">
      <v-echarts></v-echarts>
    </div>
  </el-card>
</template>

<script>
import echarts from "@/components/admin/index/echarts";
export default {
  components: {
    "v-echarts": echarts,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 750px;
  height: 350px;
  margin: 10px;
}
.wrap {
  margin-top: 10px;
}
</style>
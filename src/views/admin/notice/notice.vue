<template>
  <div>
    <div>
      <p>通知管理</p>
    </div>
    <v-table></v-table>
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
import table from "@/components/admin/notice/table";
export default {
  components: {
    "v-table": table,
  },
};
</script>
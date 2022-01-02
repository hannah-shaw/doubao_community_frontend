<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <!-- 后台首页 -->
    <el-menu-item index="1" @click="jumpIndex()">
      <i class="el-icon-s-home"></i>
      <span>后台首页</span>
    </el-menu-item>
    <!-- 文章管理 -->
    <el-menu-item index="2" @click="jumpBlog()">
      <i class="el-icon-menu"></i>
      <span slot="title">信息管理</span>
    </el-menu-item>
    <!-- 用户管理 -->
    <el-menu-item index="3" @click="jumpAccount()">
      <i class="el-icon-menu"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <!-- 通知管理 -->
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-message-solid"></i>
        <span>通知管理</span>
      </template>
      <el-menu-item :class="'active-item'" index="4-1" @click="jumpNotice()"
        >通知管理</el-menu-item
      >
      <el-menu-item
        :class="'active-item'"
        index="4-2"
        @click="jumpCreateNotice()"
        >发布通知</el-menu-item
      >
    </el-submenu>
  </el-menu>
</template>

<style scoped>
.nav {
  height: 100%;
}
.el-submenu .el-menu-item {
  min-width: 0;
}
</style>

<script>
export default {
  data() {
      return {
        activeIndex: '1',
      };
    },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
    },
    jumpIndex() {
      this.$router.push("/admin");
      this.activeIndex = "1";
    },
    jumpBlog() {
      this.$router.push("/admin/blog");
      this.activeIndex = "2";
    },
    jumpAccount() {
      this.$router.push("/admin/account");
      this.activeIndex = "3";
    },
    jumpNotice() {
      this.$router.push("/admin/notice");
      this.activeIndex = "4";
    },
    jumpCreateNotice() {
      this.$router.push("/admin/createnotice");
      this.activeIndex = "4";
    },
    getWidth() {},
  },
};
</script>

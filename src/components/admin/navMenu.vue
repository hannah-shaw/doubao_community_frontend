<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
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
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    jumpIndex() {
      this.activeIndex = "1";
      this.$router.push("/admin");
    },
    jumpAccount() {
      this.activeIndex = "3";
      this.$router.push("/admin/account");
    },
    jumpNotice() {
      this.activeIndex = "4-1";
      this.$router.push("/admin/notice");
    },
    jumpCreateNotice() {
      this.activeIndex = "4-2";
      this.$router.push("/admin/createnotice");
    },
    jumpBlog() {
      this.activeIndex = "2";
      this.$router.push("/admin/blog");
    },
    getWidth() {},
  },
};
</script>

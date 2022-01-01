<template>
  <div>
    <div class="mb-5" v-if="refresh">
      <Header></Header>
    </div>
    <div class="container context">
      <div class="columns mt-6">
        <div class="column mt-6">
          <div class="mt-6">
            <p class="content">UH OH! 页面丢失</p>
            <p class="content subtitle mt-6">
              您所寻找的页面不存在， {{ times }} 秒后，将返回首页!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
export default {
  name: "404",
  components: { Header, Footer },
  data() {
    return {
      times: 10,
      refresh: true,
    };
  },
  created() {
    this.refreshComp();
    this.goHome();
  },
  methods: {
    goHome: function () {
      this.timer = setInterval(() => {
        this.times--;
        if (this.times === 0) {
          clearInterval(this.timer);
          this.$router.push({ path: "/" });
        }
      }, 1000);
    },
    //解决vue页头懒加载导致组件错位的问题
    refreshComp() {
      // 移除组件
      this.refresh = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.refresh = true;
      });
    },
  },
};
</script>

<style scoped>
</style>
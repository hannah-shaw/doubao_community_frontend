<template>
  <div>
    <div class="mb-5" v-if="refresh">
      <Header></Header>
    </div>
    <div class="container context">
      <div class="box">🔔 {{ billboard.content }}</div>
      <div class="columns">
        <div class="column is-three-quarters">
          <Map></Map>
        </div>
        <div class="column">
          <CardBar></CardBar>
        </div>
      </div>

    </div>

    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Map from '@/components/map/map'
import { getBillboard } from "@/api/billboard";
import CardBar from "@/views/card/CardBar"
import PostList from '@/views/post/Index'
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default {
  name: "Home",
  components: {CardBar, TopicList: PostList,Map,Header, Footer},
 
    data() {
    return {
      billboard: {
        content: "",
      },
      refresh: true,
    };
  },
  created() {
    this.refreshComp();
    this.fetchBillboard();
  },
  methods: {
    async fetchBillboard() {
      getBillboard().then((value) => {
        const { data } = value;
        this.billboard = data;
      });
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
.container {
  min-height: 500px;
}
</style>
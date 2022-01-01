<template>
  <div>
      <el-card class="" shadow="never">
        <div slot="header">
          <span class="has-text-weight-bold">其他信息</span>
        </div>
        <div>
          <p
            v-for="(item, index) in recommend"
            :key="index"
            :title="item.title"
            class="block ellipsis is-ellipsis-1"
          >
            <router-link :to="{ name: 'post-detail', params: { id: item.id } }">
              <span v-if="index < 9" class="tag">
                0{{ parseInt(index) + 1 }}
              </span>
              <span v-else class="tag">
                {{ parseInt(index) + 1 }}
              </span>
              {{ item.title }}
            </router-link>
          </p>
        </div>
      </el-card>
    </div>
</template>

<script>
import { getRecommendTopics } from "@/api/post";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default {
  name: "Recommend",
  components: { Header, Footer },
  props: {
    topicId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      recommend: [],
      refresh: true,
    };
  },
  created() {
    this.refreshComp();
    this.fetchRecommendTopics();
  },
  methods: {
    fetchRecommendTopics() {
      getRecommendTopics(this.topicId).then((value) => {
        const { data } = value;
        this.recommend = data;
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
</style>

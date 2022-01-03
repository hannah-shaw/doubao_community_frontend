<template>
  <div>
      <section id="author">
        <el-card class="" shadow="never">
          <div slot="header">
            <span class="has-text-weight-bold"> 发布者信息</span>
          </div>
          <div class="has-text-centered">
            <el-avatar :size="32" :src="`https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png`" />
            <p class="is-size-5 mb-5">
              <router-link :to="{ path: `/member/${user.username}/home` }">
                {{ user.alias }}
                <span class="is-size-7 has-text-grey">{{
                  "@" + user.username
                }}</span>
              </router-link>
            </p>
            <div class="columns is-mobile">
              <div class="column is-half">
                <code>{{ user.topicCount }}</code>
                <p>发布信息</p>
              </div>
            </div>
          </div>
        </el-card>
      </section>
    </div>
</template>

<script>
import { follow, hasFollow, unFollow } from "@/api/follow";
import { mapGetters } from "vuex";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
export default {
  name: "Author",
  components: { Header, Footer },
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      hasFollow: false,
      refresh: true,
    };
  },
  mounted() {
    this.refreshComp();
    this.fetchInfo();
  },
  computed: {
    ...mapGetters(["token"]),
  },
  methods: {
    fetchInfo() {
      if (this.token != null && this.token !== "") {
        hasFollow(this.user.id).then((value) => {
          const { data } = value;
          this.hasFollow = data.hasFollow;
        });
      }
    },
    handleFollow: function (id) {
      if (this.token != null && this.token !== "") {
        follow(id).then((response) => {
          const { message } = response;
          this.$message.success(message);
          this.hasFollow = !this.hasFollow;
          this.user.followerCount = parseInt(this.user.followerCount) + 1;
        });
      } else {
        this.$message.success("请先登录");
      }
    },
    handleUnFollow: function (id) {
      unFollow(id).then((response) => {
        const { message } = response;
        this.$message.success(message);
        this.hasFollow = !this.hasFollow;
        this.user.followerCount = parseInt(this.user.followerCount) - 1;
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

<template>
  <div>
    <div class="mb-5" v-if="refresh">
      <Header></Header>
    </div>
    <div class="container context">
      <div class="columns">
        <!--文章详情-->
        <div class="column is-three-quarters">
          <!--主题-->
          <el-card class="box-card" shadow="never">
            <div slot="header" class="has-text-centered">
              <p class="is-size-5 has-text-weight-bold">{{ topic.title }}</p>
              <div class="has-text-grey is-size-7 mt-3">
                <span>{{
                  dayjs(topic.createTime).format("YYYY/MM/DD HH:mm:ss")
                }}</span>
                <el-divider direction="vertical" />
                <span>发布者：{{ topicUser.alias }}</span>
                <el-divider direction="vertical" />
                <span>查看：{{ topic.view }}</span>
              </div>
            </div>

            <!--Markdown-->
            <div id="preview" />

            <!--标签-->
            <nav class="level has-text-grey is-size-7 mt-6">
              <div class="level-left">
                <p class="level-item">
                  <b-taglist>
                    <router-link
                      v-for="(tag, index) in tags"
                      :key="index"
                      :to="{ name: 'tag', params: { name: tag.name } }"
                    >
                      <b-tag type="is-info is-light mr-1">
                        {{ "#" + tag.name }}
                      </b-tag>
                    </router-link>
                    <span class="tag is-danger is-light mr-1">
                      {{ topic.essence }}
                    </span>
                  </b-taglist>
                </p>
              </div>
              <div v-if="token && user.id === topicUser.id" class="level-right">
                <router-link
                  class="level-item"
                  :to="{ name: 'topic-edit', params: { id: topic.id } }"
                >
                  <span class="tag">编辑</span>
                </router-link>
                <a class="level-item">
                  <span class="tag" @click="handleDelete(topic.id)">删除</span>
                </a>
              </div>
            </nav>
          </el-card>

          <lv-comments :slug="topic.id" />
        </div>

        <div class="column">
          <!--作者-->
          <Author v-if="flag" :user="topicUser" />
          <!--推荐-->
          <recommend v-if="flag" :topic-id="topic.id" />
        </div>
      </div>
    </div>

    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { deleteTopic, getTopic } from "@/api/post";
import { mapGetters } from "vuex";
import Author from "@/views/post/Author";
import Recommend from "@/views/post/Recommend";
import LvComments from "@/components/Comment/Comments";
import Vditor from "vditor";
import "vditor/dist/index.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default {
  name: "TopicDetail",
  components: { Author, Recommend, LvComments, Header, Footer },
  computed: {
    ...mapGetters(["token", "user"]),
  },
  data() {
    return {
      flag: false,
      topic: {
        content: "",
        id: this.$route.params.id,
      },
      tags: [],
      topicUser: {},
      refresh: true,
    };
  },
  mounted() {
    this.refreshComp();
    this.fetchTopic();
  },
  methods: {
    renderMarkdown(md) {
      Vditor.preview(document.getElementById("preview"), md, {
        hljs: { style: "github" },
      });
    },
    // 初始化
    async fetchTopic() {
      getTopic(this.$route.params.id).then((response) => {
        const { data } = response;
        console.log(data);
        document.title = data.topic.title;

        this.topic = data.topic;
        this.tags = data.tags;
        this.topicUser = data.user;
        // this.comments = data.comments
        this.renderMarkdown(this.topic.content);
        this.flag = true;
        if (this.topic.essence == false) {
          this.topic.essence = "未核实";
        } else {
          this.topic.essence = "已核实";
        }
      });
    },
    handleDelete(id) {
      deleteTopic(id).then((value) => {
        const { code, message } = value;
        alert(message);

        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: "/" });
          }, 500);
        }
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

<style>
#preview {
  min-height: 300px;
}
</style>

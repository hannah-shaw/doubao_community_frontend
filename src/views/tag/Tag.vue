<template>
  <div>
    <div class="mb-5" v-if="refresh">
      <Header></Header>
    </div>
    <div class="container context">
      <div id="tag" class="columns">
        <div class="column is-three-quarters">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="">
              🔍 检索到 <span class="has-text-info">{{ topics.length }}</span> 篇有关
              <span class="has-text-info">{{ this.$route.params.name }}</span>
              的话题
            </div>

            <div class="text item">
              <article v-for="(item, index) in topics" :key="index" class="media mt-3">
                <div class="media-content">
                  <div class="content">
                    <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                      <router-link :to="{ name: 'post-detail',params:{id: item.id } }">
                        {{ item.title }}
                      </router-link>
                    </el-tooltip>
                  </div>

                  <nav class="level has-text-grey is-size-7">
                    <div class="level-left">
                      <span>发布于:{{ dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>

                      <span class="mx-3">浏览:{{ item.view }}</span>

                      <span>评论:{{ item.comments }}</span>
                    </div>
                  </nav>
                </div>
              </article>
            </div>
          </el-card>
        </div>

        <div class="column">
          <el-card shadow="hover">
            <div slot="header">
              🏷 其他
            </div>
            <div>
              <ul>
                <li v-for="(tag,index) in tags" :key="index" style="padding: 6px 0">
                  <router-link :to="{name:'tag',params:{name:tag.name}}">
                    <span v-if="index<9" class="tag">
                      0{{ parseInt(index) + 1 }}
                    </span>
                    <span v-else class="tag">
                      {{ parseInt(index) + 1 }}
                    </span>
                    {{ tag.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <div>
      <Footer></Footer>
    </div>

  </div>
</template>

<script>
import { getTopicsByTag } from '@/api/tag';
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default {
  name: 'Tag',
    components: {Header, Footer},
  data() {
    return {
      topics: [],
      tags: [],
      paramMap: {
        name: this.$route.params.name,
        page: 1,
        size: 10
      },
      refresh: true,
    }
  },
  created() {
    this.refreshComp();
    this.fetchList()
  },
  methods: {
    fetchList: function() {
      getTopicsByTag(this.paramMap).then(response => {
        console.log(response)
        this.topics = response.data.topics.records
        this.tags = response.data.hotTags.records
      })
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
  }
}
</script>

<style scoped>
#tag {
  min-height: 500px;
}

.container {
  min-height: 500px;
}

</style>

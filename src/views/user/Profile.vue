<template>
  <div>
    <div class="mb-5" v-if="refresh">
      <Header></Header>
    </div>
    <div class="container context">
      <div class="member">
        <div class="columns">
          <div class="column is-one-quarter">
            <el-card shadow="never">
              <div slot="header" class="has-text-centered">
                <el-avatar :size="64" :src="`https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png`" />
                <p class="mt-3">{{ topicUser.alias || topicUser.username }}</p>
              </div>
              <div>
                <p class="content">发布信息数：<code>{{ topicUser.score }}</code></p>
                <p class="content">注册时间：{{ dayjs(topicUser.createTime).format("YYYY/MM/DD HH:MM:ss") }}</p>
                <!-- <p class="content">简介：{{ topicUser.bio }}</p> -->
              </div>
            </el-card>
          </div>

          <div class="column">
            <!--用户发布的话题-->
            <el-card class="box-card content" shadow="never">
              <div slot="header" class="has-text-weight-bold">
                <span>话题</span>
              </div>

              <div v-if="topics.length===0">
                暂无话题
              </div>

              <div v-else class="topicUser-info">
                <article v-for="(item, index) in topics" :key="index" class="media">
                  <div class="media-content">
                    <div class="content ellipsis is-ellipsis-1">
                      <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                        <router-link :to="{ name: 'post-detail', params: { id: item.id } }">
                          {{ item.title }}
                        </router-link>
                      </el-tooltip>
                    </div>
                    <nav class="level has-text-grey is-size-7">
                      <div class="level-left">
                        <span class="mr-1">
                          发布于:{{ dayjs(item.createTime).format("YYYY/MM/DD HH:mm:ss") }}
                        </span>
                      </div>
                    </nav>
                  </div>
                  <div v-if="token" class="media-right">
                    <div v-if="topicUser.username === user.username" class="level">
                      <div class="level-item mr-1">
                        <router-link :to="{name:'topic-edit',params: {id:item.id}}">
                          <span class="tag is-warning">编辑</span>
                        </router-link>
                      </div>
                      <div class="level-item">
                        <a @click="handleDelete(item.id)">
                          <span class="tag is-danger">删除</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              <!--分页-->
              <pagination
                v-show="page.total > 0"
                class="mt-5"
                :total="page.total"
                :page.sync="page.current"
                :limit.sync="page.size"
                @pagination="fetchUserById"
              />
            </el-card>
          </div>
        </div>
      </div>
    </div>

    <div>
      <Footer></Footer>
    </div>

  </div>
</template>

<script>
import { getInfoByName } from '@/api/user'
import pagination from '@/components/Pagination/index'
import { mapGetters } from 'vuex'
import { deleteTopic } from '@/api/post'
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default {
  name: 'Profile',
  components: { pagination ,Header, Footer},
  data() {
    return {
      topicUser: {},
      topics: {},
      page: {
        current: 1,
        size: 5,
        total: 0
      },
      refresh: true,
    }
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  created() {
    this.refreshComp();
    this.fetchUserById()
  },
  methods: {
    fetchUserById() {
      getInfoByName(this.$route.params.username, this.page.current, this.page.size).then((res) => {
        const { data } = res
        this.topicUser = data.user
        this.page.current = data.topics.current
        this.page.size = data.topics.size
        this.page.total = data.topics.total
        this.topics = data.topics.records
      })
    },
    handleDelete(id) {
      deleteTopic(id).then(value => {
        const { code, message } = value
        alert(message)

        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/' })
          }, 500)
        }
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
.container {
  min-height: 500px;
}
</style>

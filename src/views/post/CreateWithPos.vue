<template>
  <div>
    <div class="mb-5" v-if="refresh">
      <Header></Header>
    </div>
    <div class="container context">
      <div class="columns">
        <div class="column is-full">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span><i class="fa fa fa-book"> 发布信息 </i></span>
            </div>
            <div>
              <el-form
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                class="demo-ruleForm"
              >
                <el-form-item prop="title">
                  <el-input
                    v-model="ruleForm.title"
                    placeholder="输入信息标题"
                  />
                </el-form-item>

                <div class = "smap">
                    <Map></Map>
                </div>
                <!--Markdown-->
                <div id="vditor" />

                <b-taginput
                  v-model="ruleForm.tags"
                  class="my-3"
                  maxlength="15"
                  maxtags="3"
                  ellipsis
                  placeholder="请输入信息标签，限制为 15 个字符，推荐附带“人员求救”“物资求救”“物资提供”等标签"
                />

                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')"
                    >立即创建
                  </el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
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
import { post } from "@/api/post";
import Vditor from "vditor";
import "vditor/dist/index.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { pca, pcaa } from 'area-data'; // v5 or higher
import 'vue-area-linkage/dist/index.css'; // v2 or higher
import Map from '@/components/map/searchMap'

export default {
  name: "TopicPost",
  components: { Header, Footer,Map},
  data() {
    return {
      contentEditor: {},
      ruleForm: {
        title: "", // 标题
        tags: [], // 标签
        content: "", // 内容
      },
      rules: {
        title: [
          { required: true, message: "请输入信息标题", trigger: "blur" },
          {
            min: 1,
            max: 25,
            message: "长度在 1 到 25 个字符",
            trigger: "blur",
          },
        ],
      },
      textarea1: "",
      textarea2: "",
      refresh: true,
    };
  },
  mounted() {
    this.refreshComp();
    this.contentEditor = new Vditor("vditor", {
      height: 500,
      placeholder:
        "此处为信息内容，请按需填写……\n"+
        "例如，若是求救者填写\n【位置】：\n【联系方式】：\n【灾情描述】：\n"+
        "例如，若是志愿者填写\n【位置】：\n【联系方式】：\n【物资信息】：\n"
        ,
      theme: "classic",
      counter: {
        enable: true,
        type: "markdown",
      },
      preview: {
        delay: 0,
        hljs: {
          style: "monokai",
          lineNumber: true,
        },
      },
      tab: "\t",
      typewriterMode: true,
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      mode: "sv",
    });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (
            this.contentEditor.getValue().length === 1 ||
            this.contentEditor.getValue() == null ||
            this.contentEditor.getValue() === ""
          ) {
            alert("信息内容不可为空");
            return false;
          }
          if (this.ruleForm.tags == null || this.ruleForm.tags.length === 0) {
            alert("标签不可以为空");
            return false;
          }
          this.ruleForm.content = this.contentEditor.getValue();
          post(this.ruleForm).then((response) => {
            const { data } = response;
            setTimeout(() => {
              this.$router.push({
                name: "post-detail",
                params: { id: data.id },
              });
            }, 800);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.contentEditor.setValue("");
      this.ruleForm.tags = "";
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
  .smap{
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>

<template>
  <div>
    <div class="mb-5" v-if="refresh">
      <Header></Header>
    </div>
    <div class="container context">
      <section>
        <el-card shadow="never">
          <div slot="header">
            个人设置
          </div>
          <div class="columns">
            <div class="column is-full">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基础信息" name="first">
                  <el-form :label-position="labelPosition" label-width="100px" :model="user">
                    <el-form-item label="账号">
                      <el-input v-model="user.username" disabled />
                    </el-form-item>
                    <el-form-item label="昵称">
                      <el-input v-model="user.alias" />
                    </el-form-item>
                    <el-form-item label="简介">
                      <el-input v-model="user.bio" />
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                      <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="电子邮箱" name="third">
                  <el-form ref="dynamicValidateForm" :model="user" label-width="100px" class="demo-dynamic">
                    <el-form-item
                      prop="email"
                      label="邮箱"
                      :rules="[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                      ]"
                    >
                      <el-input v-model="user.email" />
                    </el-form-item>

                    <el-form-item>
                      <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                      <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="手机号" name="fourth">
                  <el-form ref="dynamicValidateForm" :model="user" label-width="100px" class="demo-dynamic">
                    <el-form-item>
                      <el-input v-model="user.mobile" />
                    </el-form-item>

                    <el-form-item>
                      <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                      <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-card>
      </section>
    </div>

    <div>
      <Footer></Footer>
    </div>

  </div>
</template>

<script>
import { getInfo, update } from "@/api/user";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default {
  name: "Setting",
    components: {Header, Footer},
  data() {
    return {
      activeName: "first",
      labelPosition: "right",
      user: {
        id: "",
        username: "",
        alias: "",
        bio: "",
        email: "",
        mobile: "",
        avatar: "",
      },
      refresh: true,
    };
  },
  created() {
    this.refreshComp();
    this.fetchInfo();
  },
  methods: {
    fetchInfo() {
      getInfo(this.$route.params.username).then((res) => {
        console.log(res);
        const { data } = res;
        this.user = data;
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
      console.log(this.user);
      update(this.user).then((res) => {
        this.$message.success("信息修改成功");
        this.fetchInfo();
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
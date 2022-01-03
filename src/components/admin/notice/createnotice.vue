<template>
  <div class="columns">
    <div class="column is-full">
      <el-card
        class="box-card"
        shadow="never"
      >
        <div
          slot="header"
          class="clearfix"
        >
          <span><i class="fa fa fa-book" style="font-size:24px;font-weight: bold;font-style:normal"> 发布通知</i></span>
        </div>
        <div>
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            class="demo-ruleForm"
          >
            <p style="font-size:18px">标题</p>
            <el-form-item prop="content">
              <el-input
                v-model="ruleForm.content"
                placeholder="输入通知"
              />
            </el-form-item>

            <div style="padding-top:20px">
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm('ruleForm')"
                >立即发布
                </el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

import store from '@/store'
import { createBillboard } from '@/api/billboard'

export default {
  name: 'createnotice',
  data() {
    return {
      ruleForm: {
        content: '', 
      },
      rules: {
        content: [
          { required: true, message: '请输入通知名称', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '长度在 1 到 50 个字符',
            trigger: 'blur'
          }
        ]
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createBillboard(this.ruleForm).then((response) => {
            this.$message({
              message: '已发布成功',
              type: 'success'
            });
          });

        } else {
          this.$message.error('发布失败，请检验发布信息');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.contentEditor.setValue("");
      this.ruleForm.tags = "";
    },
  }
}
</script>

<style scoped>
</style>

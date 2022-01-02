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
            <el-form-item prop="title">
              <el-input
                v-model="ruleForm.title"
                placeholder="输入通知名称"
              />
            </el-form-item>

            <div style="padding-top:20px">
              <el-form-item>
                <el-button
                  type="primary"
                >立即发布
                </el-button>
                <el-button >重置</el-button>
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

import Vditor from 'vditor'
import 'vditor/dist/index.css'

export default {
  name: 'createnotice',

  data() {
    return {
      contentEditor: {},
      ruleForm: {
        title: '', // 标题
        content: '' // 内容
      },
      rules: {
        title: [
          { required: true, message: '请输入通知名称', trigger: 'blur' },
          {
            min: 1,
            max: 25,
            message: '长度在 1 到 25 个字符',
            trigger: 'blur'
          }
        ]
      },
    }
  },
  methods: {

  }
}
</script>

<style scoped>
</style>

<template>
  <div>
    <div class="container context">
      <!--分页-->
      <pagination
        v-show="page.total > 0"
        :total="page.total"
        :page.sync="page.current"
        :limit.sync="page.size"
        @pagination="init"
      />

  <div v-if="refresh"> 
    <el-col :span="22">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="发表时间">
                <span>{{ dayjs(props.row.create_time).format("YYYY/MM/DD") }}</span>
              </el-form-item>
              <el-form-item label="用户">
                <span>{{ props.row.author }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{ props.row.status }}</span>
              </el-form-item>
              <el-form-item label="详情">
                  <router-link :to="{name:'post-detail',params:{id:props.row.id}}">
                    <span class="is-size-6" style="color:#0066FF">{{props.row.title }}</span>
                  </router-link>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="用户名" prop="author"> </el-table-column>
        <el-table-column label="文章标题" prop="title"> </el-table-column>
        <el-table-column label="状态" prop="status"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handlechecked(scope.row)"
              :disabled= "scope.row.status2"
              >核实</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="handledanger(scope.row)"
              :disabled= "scope.row.danger"
              plain
              >确认获救</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handledelete(scope.row)"
              plain
              >删除</el-button
            >

          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </div>
    </div>
  </div>
</template>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.v-search {
  display: flex;
  justify-content: center;
  margin-left: 20px;
}
.search-div {
  float: left;
}

.p-center {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination {
  float: left;
}

.center {
  display: flex;
  justify-content: center;
}

.notice{
  float: right;
  display: block;
  margin-right: 140px;
}
</style>

<script>
import { getList,check,deleteTopic,top } from '@/api/post'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      input: "",
      tableData: [
      ],
      page: {
        current: 1,
        size: 10,
        total: 0,
        tab: 'latest'
      },
      refresh: true,
    };
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getList(this.page.current, this.page.size,"latest").then((response) => {
        const { data } = response
        console.log(data)
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        for (var i = 0; i < data.records.length; i++) {
              this.tableData.push({
                id:"",
                title: "",
                author: "",
                create_time: "",
                status: "",
                status2: "",
                danger:"",
                view: "",
              });
              // 帖子id
              this.tableData[i].id = data.records[i].id;
              // 发布时间
              this.tableData[i].create_time = data.records[i].createTime;
              // 标题
              this.tableData[i].title = data.records[i].title;
              // 作者
              this.tableData[i].author = data.records[i].alias;
              //状态
              this.tableData[i].status2 = data.records[i].essence 
              if(data.records[i].essence == false){
                this.tableData[i].status = "未核实"
              }
              else{
                this.tableData[i].status = "已核实"
              }
              //紧急
              if(data.records[i].top == false){
                this.tableData[i].danger = false
              }
              else{
                this.tableData[i].danger = true
              }
              // 浏览量
              this.tableData[i].view = data.records[i].view;
            }
      })
    },
    handlechecked(row) {
      console.log(row.id);
      check(row.id).then(value => {
        const { code, message } = value
        this.$message({
          message: message
        });

        if(code === 200){
          setTimeout(() => {
            Object.assign(this.$data,this.$options.data())
            this.refreshComp();
            this.init()
          }, 500)
        }
      })

    },
    handledanger(row) {
      console.log(row.id);
      top(row.id).then(value => {
        const { code, message } = value
        this.$message({
          message: message
        });

        if(code === 200){
          setTimeout(() => {
            Object.assign(this.$data,this.$options.data())
            this.refreshComp();
            this.init()
          }, 500)
        }
      })
    },
    handledelete(row) {
      console.log(row.id);
      deleteTopic(row.id).then(value => {
        const { code, message } = value
        this.$message({
          message: message
        });

        if (code === 200) {
          setTimeout(() => {
            Object.assign(this.$data,this.$options.data())
            this.refreshComp();
            this.init()
          }, 500)
        }
      })
    },
    //解决vue懒加载导致组件错位的问题
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
};
</script>
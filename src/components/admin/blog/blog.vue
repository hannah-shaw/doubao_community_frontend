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
          <template>
            <!-- <template slot-scope="scope"> -->
            <el-button
              size="mini"
              >核实</el-button
            >
            <el-button
              size="mini"
              type="danger"
              >删除</el-button
            >

          </template>
        </el-table-column>
      </el-table>
    </el-col>
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
import { getList } from '@/api/post'
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
      }
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
              if(data.records[i].essence == false){
                this.tableData[i].status = "未核实"
              }
              else{
                this.tableData[i].status = "已核实"
              }
              // 浏览量
              this.tableData[i].view = data.records[i].view;
            }
      })
    },
  }
};
</script>
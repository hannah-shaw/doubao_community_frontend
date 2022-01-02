<template>
  <div> 
    <div class="container context">
      <el-col :span="22">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="center" inline class="demo-table-expand">
                <el-form-item label="发表时间">
                  <span>{{ dayjs(props.row.create_time).format("YYYY/MM/DD") }}</span>
                </el-form-item>
                <el-form-item label="通知标题">
                  <span>{{ props.row.content}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="通知标题" prop="content"> 
          </el-table-column>
          <el-table-column label="操作">
            <template>
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
</style>

<script>
import { getBillboard } from "@/api/billboard";
import { getAllBillboard } from "@/api/billboard";
export default {
  data() {
    return {
      input: "",
      tableData: [
      ],
      total: 0,
    };
  },
  created(){
    this.fetchList();
  },
  methods: {
    fetchList() {
      getAllBillboard().then((response) => {
        const { data } = response
        this.total = response.data.length;
        for (var i = 0; i < this.total; i++) {
            console.log("success");
              this.tableData.push({
                create_time: "",
                content: "",
              });
              // 发布时间
              this.tableData[i].create_time = data[i].createTime;
              // 内容
              this.tableData[i].content = data[i].content;
            }
        console.log(data);
      })
    },

  },
};
</script>
<template>
  <div>

    <div :class="'notice'">
      <el-badge :value="12" class="item">
        <el-button size="small">待处理文章</el-button>
      </el-badge>
    </div>

    <el-col :span="22">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="发表时间">
                <span>{{ props.row.releaseTime }}</span>
              </el-form-item>
              <el-form-item label="用户 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{ props.row.status }}</span>
              </el-form-item>
              <el-form-item label="内容">
                <span>{{ props.row.blog }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="发表时间" prop="releaseTime"> </el-table-column>
        <el-table-column label="用户名" prop="id"> </el-table-column>
        <el-table-column label="文章标题" prop="blog"> </el-table-column>
        <el-table-column label="状态" prop="status"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDetail(scope.$index, scope.row)"
              >核实</el-button
            >
            <el-button
              size="mini"
              @click="handleDisabled(scope.$index, scope.row)"
              >删除</el-button
            >

          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-col :span="22" :class="'center'">
      <div class="block p-center pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="this.tableDataAll.length"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :current-size="pageSize"
        >
        </el-pagination>
      </div>
    </el-col>
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
export default {
  data() {
    return {
      input: "",
      tableData: [
        {
          releaseTime: "2021-09-24",
          id: "xiaohan",
          status: "已核实",
          blog: "晋安区泰禾广场地下一层停车场两人被困",
        },
        {
          releaseTime: "2021-09-24",
          id: "xiaohan",
          status: "已核实",
          blog: "晋安区泰禾广场地下一层停车场两人被困",
        },
        {
          releaseTime: "2021-09-24",
          id: "xiaohan",
          status: "已核实",
          blog: "晋安区泰禾广场地下一层停车场两人被困",
        },
        {
          releaseTime: "2021-09-24",
          id: "xiaohan",
          status: "已核实",
          blog: "晋安区泰禾广场地下一层停车场两人被困",
        },
      ],
      tableDataAll: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
    };
  },
  methods: {
    handleDetail(index, row) {
      console.log(index, row);
    },
    handleDisabled(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    convert() {},
    handleCurrentChange: function (currentPage) {
      console.log("handleCurrentChange()\n");
      this.tableData = [];
      this.currentPage = currentPage;
      console.log("currentPage=" + currentPage + "\n");
      var i;
      for (
        var i = (currentPage - 1) * 10, j = 0;
        j < 10 &&
        this.tableDataAll.length != 0 &&
        i + j <= this.tableDataAll.length - 1;
        j++, i++
      ) {
        console.log("i=" + i + "\n");
        this.tableData.push(this.tableDataAll[i]);
        console.log(
          "this.tableDataAll[i]" + JSON.stringify(this.tableDataAll[i]) + "\n"
        );
      }
      if (this.tableDataAll.length == 0) {
        this.tableData = [];
      }
    },
  },
};
</script>
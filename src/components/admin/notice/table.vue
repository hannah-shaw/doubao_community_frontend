<template>
  <div>

    <el-col :span="22">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="发表时间">
                <span>{{ props.row.releaseTime }}</span>
              </el-form-item>
              <el-form-item label="管理员 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="通知标题">
                <span>{{ props.row.blog }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="发表时间" prop="releaseTime"> </el-table-column>
        <el-table-column label="管理员 ID" prop="id"> </el-table-column>
        <el-table-column label="通知标题" prop="blog"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
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
</style>

<script>
export default {
  data() {
    return {
      input: "",
      tableData: [
        {
          releaseTime: "2021-9-25",
          id: "xiaohan",
          blog: "请各地志愿者马上前往荣校东路和新中大道交叉口集结，沿荣校东路一字排开，紧急筑坝拦水！！",
        },
        {
          releaseTime: "2021-9-25",
          id: "xiaohan",
          blog: "台江区仁德路口腔医院门口积水严重，多辆汽车抛锚，请市民绕道避免危险",
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
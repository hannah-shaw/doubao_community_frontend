<template>
  <div>
    <div class="container context">
      <el-col :span="22">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="用户">
                  <span>{{ props.row.nickname }}</span>
                </el-form-item>
                <el-form-item label="ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="联系方式">
                  <span>{{ props.row.status }}</span>
                </el-form-item>
                <el-form-item label="权限">
                  <span>{{ props.row.role }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="用户昵称" prop="nickname"> </el-table-column>
          <el-table-column label="用户 ID" prop="id"> </el-table-column>
          <el-table-column label="联系方式" prop="status"> </el-table-column>
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
import { getAccount } from '@/api/user'
export default {
  data() {
    return {
      input: "",
      tableData: [
        {
          nickname: "肖寒",
          id: "xiaohan",
          status: "13107675919",
          role:"管理员"
        },
        {
          nickname: "沈梦瑶",
          id: "smy",
          status: "18959378306",
          role:"普通用户"
        },
        {
          nickname: "王奕",
          id: "wy",
          status: "16723682763",
          role:"普通用户"
        },
      ],
      tableDataAll: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
    };
  },
  created() {
    this.init()
  },
  methods: {
    init() {
    },
  },
};
</script>
<template>

  <div> 
    <div class="container context">
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width=auto
    label-position= left
    class="demo-ruleForm"
  >
    <el-form-item label="避难所名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="搜索位置" >
        <div class = "smap">
            <div id="all">
                <el-input
                type="text"
                id="suggestId"
                name="address_detail"
                placeholder="地址"
                v-model="address_detail"
                class="input_style"
                />
                <div id="allmap"></div>
            </div>
        </div>   
    </el-form-item>

    <el-form-item label="描述" prop="description">
      <el-input v-model="ruleForm.description" placeholder="避难所具体地址或相关物资描述"></el-input>
    </el-form-item>

    <el-form-item label="管理部门名称" prop="minister">
      <el-input v-model="ruleForm.minister"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >立即创建</el-button
      >
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
    </div>
  </div>
</template>

<script>
import Map from '@/components/map/searchMap'
import { create } from '@/api/position'
export default {
    
  components: {Map},
  data() {
    return {
      ruleForm: {
        name: "",
        description: "",
        posx:"",
        posy:"",
        minister: "",
      },
      address_detail: "", //详细地址
      userlocation: { lng: "", lat: "" },
      rules: {
        name: [
          { required: true, message: "请输入避难所名称", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
        description: [
          { required: true, message: "请输入避难所具体位置", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.$nextTick(function () {
      var th = this;
      // 创建Map实例
      var map = new BMap.Map("allmap");
      // 初始化地图,设置中心点坐标，
      var point = new BMap.Point(121.48789949, 31.24916171); // 初始化point, 给定一个默认x,y值
      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom();

      var ac = new BMap.Autocomplete({
        //建立一个自动完成的对象
        input: "suggestId",
        location: map,
      });
      var myValue;
      ac.addEventListener("onconfirm", function (e) {
        //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business;
        this.address_detail  = myValue;
        setPlace();
      });

      // 获取当前地理位置
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          //alert('您当前位置：' + r.point.lng + ',' + r.point.lat);
        } else {
          //alert('failed' + this.getStatus());
        }
      });

      function setPlace() {
        map.clearOverlays(); //清除地图上所有覆盖物
        function myFun() {
          th.userlocation = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
          map.centerAndZoom(th.userlocation, 18);
          map.addOverlay(new BMap.Marker(th.userlocation)); //添加标注
          
        }

        var local = new BMap.LocalSearch(map, {
          //智能搜索
          onSearchComplete: myFun,
        });
        local.search(myValue);

        //测试输出坐标（指的是输入框最后确定地点的经纬度）
        map.addEventListener("click", function (e) {
          alert(
            "经度:" + th.userlocation.lng + "纬度:" + th.userlocation.lat
          );
        });
      }
    });
  },
  methods: {
    submitForm(formName) {
      this.ruleForm.posx = this.userlocation.lng
      this.ruleForm.posy = this.userlocation.lat
      this.$refs[formName].validate((valid) => {
        if (valid) {
            console.log(this.ruleForm)
            create(this.ruleForm).then((response) => {
                this.$message({
                message: '已发布成功',
                type: 'success'
                });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
  .smap{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  #allmap {
  width: auto;
  height: 400px;
  font-family: "微软雅黑";
  }
</style>
<template>
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
</template>
<script>
export default {
  name: "sMapox",
  data() {
    return {
      address_detail: null, //详细地址
      userlocation: { lng: "", lat: "" },
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
        this.address_detail = myValue;
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
};
</script>
<style scoped>
#allmap {
  width: auto;
  height: 400px;
  font-family: "微软雅黑";
}
</style>
<template>
  <div id="allmap"
       class="Map" />
</template>
 
<script>
/* eslint-disable*/
 
 
export default {
  name: 'Mapbox',
  data() {
    return {
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      var map = new BMap.Map("allmap");   //初始化map, 绑定id=allmap
      var point = new BMap.Point(121.48789949, 31.24916171);   // 初始化point, 给定一个默认x,y值
      map.centerAndZoom(point, 10);        // 将point点放入map中，展示在页面中心展示，10=缩放程度
      map.enableScrollWheelZoom();         // 开启滚动鼠标滑轮
 
      // 如有多个point去展示，可根据后端接口传入为主
      let data = [
        { x: 119.309157, y: 26.099683, name: '恒力金融中心' },
        { x: 119.321246, y: 26.096494, name: '恒宇国际' },
        { x: 119.321896, y: 26.090404, name: '中国建筑材料工业地质勘查中心福建总队设计大楼' },
        { x: 119.317775, y: 26.084276, name: '正祥中心' },
        { x: 119.33448, y:  26.070296, name: '福州青少年活动中心' },

      ]
 
      data.forEach((e, i) => {
        // 创建point, 将x,y值传入
        let pointNumber = new BMap.Point(e.x, e.y)
 
        // 创建信息窗口对象 
        let infoWindow = new BMap.InfoWindow("", {
          width: 150,     // 信息窗口宽度   
          height: 100,     // 信息窗口高度   
          title: data[i].name  // 信息窗口标题  
        });
        // 将data中的name加入地图中
        var label = new BMap.Label(e.name, {
          offset: new BMap.Size(15, 5)
        });
        markerFun(pointNumber, infoWindow, label)
      })
 
      function markerFun(points, infoWindows, label) {
        let markers = new BMap.Marker(points);
        map.addOverlay(markers);  // 将标注添加到地图中
        markers.setLabel(label);  // 将data中的name添加到地图中
        // 标注的点击事件
        markers.addEventListener("click", function (event) {
          //map.openInfoWindow(infoWindows, points);//参数：窗口、点  根据点击的点出现对应的窗口
        });
      }
 
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
 
    })
  },
  methods: {
 
  }
}
</script>
 
<style>
.Map {
  height: calc(100vh - 126px);
  width: 100%;
}
</style>
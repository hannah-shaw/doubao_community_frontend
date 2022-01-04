<template>
    <el-card class="box-card">
      <div :class="'title'">
        <i class="el-icon-data-line"></i>
        地图可视化
      </div>
          <div id="allmap"
            class="Map" />
    </el-card>
</template>
<script>
/* eslint-disable*/
 
 
import { getPosition } from '@/api/position'
export default {
  name: 'dataMap',
  data() {
    return {
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$nextTick(() => {
            var map = new BMap.Map("allmap");   //初始化map, 绑定id=allmap
            var point = new BMap.Point(121.48789949, 31.24916171);   // 初始化point, 给定一个默认x,y值
            map.centerAndZoom(point, 10);        // 将point点放入map中，展示在页面中心展示，10=缩放程度
            map.enableScrollWheelZoom();         // 开启滚动鼠标滑轮

            var pdata = []
            getPosition().then((response) => {
              const { data } = response
              for (var i = 0; i < data.length; i++) {
                    pdata.push({
                      id:"",
                      name: "",
                      x: "",
                      y: "",
                      create_time: "",
                      minister: "",
                      description:"",
                    });
                    pdata[i].id = data[i].id;
                    pdata[i].name = data[i].name;
                    pdata[i].x = data[i].posx;
                    pdata[i].y = data[i].posy;
                    pdata[i].create_time = data[i].create_time;
                    pdata[i].minister = data[i].minister;
                    pdata[i].description = data[i].description;

                    let pointNumber = new BMap.Point(pdata[i].x,pdata[i].y)
                    var opts = {
                      width: 210,     // 信息窗口宽度   
                      height: 125,     // 信息窗口高度   
                      title: pdata[i].name  // 信息窗口标题
                    }
                    // 创建信息窗口对象 
                    let infoWindow = new BMap.InfoWindow(
                      "详情:" + pdata[i].description
                      + "<br>避难场所管理部门:" + pdata[i].minister
                      , opts
                    );
                    // 将data中的name加入地图中
                    var label = new BMap.Label(pdata[i].name, {
                      offset: new BMap.Size(15, 5)
                    });
                    markerFun(pointNumber, infoWindow, label)                    
                  }        
            })
      
            function markerFun(points, infoWindows, label) {
              let markers = new BMap.Marker(points);
              map.addOverlay(markers);  // 将标注添加到地图中
              markers.setLabel(label);  // 将data中的name添加到地图中
              // 标注的点击事件
              markers.addEventListener("click", function (event) {
                map.openInfoWindow(infoWindows, points);//参数：窗口、点  根据点击的点出现对应的窗口
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

    }
    
  }
}
</script>
 

<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 1080px;
  height: 700px;
  margin: 10 10px;
}
.Map {
  height: calc(100vh - 126px);
  width: 100%;
}
/*地图标题*/
.BMap_bubble_title {
	color:white;
	font-size:13px;
	font-weight:bold;
	text-align:left;
	padding-left:5px;
	padding-top:5px;
	border-bottom:1px solid gray;
	background-color:#0066b3;
}
/* 消息内容 */
.BMap_bubble_content {
	background-color:white;
	padding-left:5px;
	padding-top:5px;
	padding-bottom:10px;
}
/* 内容 */
.BMap_pop div:nth-child(9) {
	top:35px !important;
	border-radius:7px;
}
/* 左上角删除按键 */
.BMap_pop img {
	top:43px !important;
	left:215px !important;
}
.BMap_top {
	display:none;
}
.BMap_bottom {
	display:none;
}
.BMap_center {
	display:none;
}
/* 隐藏边角 */
.BMap_pop div:nth-child(1) div {
	display:none;
}
.BMap_pop div:nth-child(3) {
	display:none;
}
.BMap_pop div:nth-child(7) {
	display:none;
}
</style>
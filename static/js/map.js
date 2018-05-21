/**
 * Created by Monkey on 2018/5/16.
 */
var _properties = new Array("province", "city", "district");
var flag = 0;//计数器
var start_point = new BMap.Point(110.404, 32.915);// 创建点坐标
let coder = new BMap.Geocoder();
/*bm.addEventListener('dblclick', function (e) {
    var pt = e.point;
    console.log(pt)
    //移除原有的标注
    bm.clearOverlays();
    geoc.getLocation(pt, function (rs) {
        console.log(rs);
        addPly(rs.addressComponents.province)
    });
});*/

/**
 * 添加覆盖物
* */
function addPly(region, color) {
    var bdary = new BMap.Boundary();
    bdary.get(region, function (rs) {       //获取行政区域
        //bm.clearOverlays();        //清除地图覆盖物
        var count = rs.boundaries.length; //行政区域的点有多少个
        for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i],
                {
                    strokeWeight: 2, //设置多边形边线线粗
                    strokeOpacity: 0.5, //设置多边形边线透明度0-1
                    StrokeStyle: "solid", //设置多边形边线样式为实线或虚线，取值 solid 或 dashed
                    fillColor: color, //设置多边形填充颜色
                    fillOpacity: 0.5,//设置多边形填充颜色透明度0-1
                    strokeColor: "#fff", //设置多边形边线颜色
                }); //建立多边形覆盖物
            ply.addEventListener('mouseover',function (e) {
                coder.getLocation(e.point,function (rs) {
                    let name = rs.addressComponents[_properties[flag]];//获得点击的点的行政区划名字
                    let province = rs.addressComponents.province;
                    let city = rs.addressComponents.city;
                    let district = rs.addressComponents.district;
                    console.log(name)
                    console.log(province)
                    console.log(city)
                    console.log(district)
                })
            })
            bm.addOverlay(ply);  //添加覆盖物
        }
    });
}
/**
 * 下钻函数
 * */
function drilling(e) {
    if ((0 <= flag) && (flag < 3)) {
        let point = e.point;
        console.log(e)
        coder.getLocation(point, function (rs) {
            let name = rs.addressComponents[_properties[flag]];//获得点击的点的行政区划名字
            let province = rs.addressComponents.province;
            let city = rs.addressComponents.city;
            let district = rs.addressComponents.district;
            bm.clearOverlays();
            addPly_(name, province, city);               //调用colors.js中的添加覆盖物函数
            //调整视野和zoom
            bm.setCenter(name);
            var zoom = bm.getZoom() + 2;
            bm.setZoom(zoom);
            flag = flag + 1;               //计数器+1，表示下钻到下一层
        })
    }
}
/**
 * 返回上级函数
 * */
function back(e) {
    if ((0 < flag) && (flag <= 3)) {
        //通过覆盖物的矩形中心点确定覆盖的区域
        var point = bm.getOverlays()[0].getBounds().getCenter();
        coder.getLocation(point, function (rs) {
            var name = rs.addressComponents[_properties[flag - 2]];
            var province = rs.addressComponents.province;
            var city = rs.addressComponents.city;
            //返回上层的覆盖物
            if (name) {
                bm.clearOverlays();
                addPly_(name, province, city);
                //调整视野和zoom
                bm.setCenter(name);
                var zoom = bm.getZoom() - 2;
                bm.setZoom(zoom);
            }
            else {
                bm.clearOverlays();
                //调整视野和zoom为初始值
                bm.centerAndZoom(start_point, 5)
            }
            flag = flag - 1; //计数器-1，表示返回上一层
        })
    }

}
/**
 * 为每一个地区绘制颜色
 * */
function addPly_(name, province, city) {
    $.ajax({
        url: "data/china.json",
        dataType: "json",
        success: function (rs) {
            //省级
            if (rs.province[name]) {
                console.log(1)
                var sub = Object.keys(rs.province[name].sub)//获取地级市数组
                sub.forEach(function (cr, index, arr) {
                    var color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);//随机产生颜色
                    addPly(cr, color)
                })

            }
            //市级
            else if (rs.province[province].sub[name]) {
                console.log(2)
                var sub = Object.keys(rs.province[province].sub[name].sub) //获取区级数组
                if (sub != "") {
                    sub.forEach(function (cr, index, arr) {
                        var color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);//随机产生颜色
                        addPly(cr, color)
                    })
                }
                else {
                    var color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);//随机产生颜色
                    addPly(name, color)
                }
            }
            //区级
            else if (rs.province[province].sub[city].sub[name]) {
                console.log(3)
                var color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
                addPly(name, color)
            }

        }

    })
}



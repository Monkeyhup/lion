/**
 * Created by lyh on 2018/5/8.
 */
function addPly_(name, province, city) {
    $.ajax({
        url: "data/china.json",
        dataType: "json",
        success: function (rs) {
            //省级
            if (rs.province[name]) {
                var sub = Object.keys(rs.province[name].sub)//获取地级市数组
                sub.forEach(function (cr, index, arr) {
                    var color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);//随机产生颜色
                    addPly(cr, color)
                })

            }
            //市级
            else if (rs.province[province].sub[name]) {
                var sub = Object.keys(rs.province[province].sub[name].sub) //获取区级数组
                if (sub != "") {
                    sub.forEach(function (cr, index, arr) {
                        console.log(cr)
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
                var color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
                addPly(name, color)
            }

        }

    })
}

function addPly(name, color) {
    var bdy = new BMap.Boundary();
    bdy.get(name, function (rs) {
        // map.clearOverlays();        //清除地图覆盖物
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
            map.addOverlay(ply);  //添加覆盖物
        }
    })
}
addPly("和平区", "#000")

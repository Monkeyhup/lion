/**
 * Created by lyh on 2018/5/8.
 */
//添加覆盖物函数
/*
function addPly(name) {
    var bdy=new BMap.Boundary();
    bdy.get(name,function (rs) {
        map.clearOverlays();        //清除地图覆盖物
        var count = rs.boundaries.length; //行政区域的点有多少个
        for(var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i],
                {
                    strokeWeight: 2, //设置多边形边线线粗

                    strokeOpacity: 0.5, //设置多边形边线透明度0-1
                    StrokeStyle: "solid", //设置多边形边线样式为实线或虚线，取值 solid 或 dashed
                    fillColor: "#FFB6C1", //设置多边形填充颜色
                    fillOpacity: 0.5,//设置多边形填充颜色透明度0-1
                    strokeColor: "#ff0000", //设置多边形边线颜色

                }); //建立多边形覆盖物
            map.addOverlay(ply);  //添加覆盖物
        }
    })
}
*/

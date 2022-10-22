var dom = document.getElementById("display");
var myChart = echarts.init(dom);
var app = {};
option = null;
var data = [   //全局变量，也就是绘制图表所需的数据
];

var departure=[];
var price=[];


var departure_cp = sessionStorage.getItem('mydeparture');
var departure_dt_cp = sessionStorage.getItem('mydeparturedt');


// alert(datacp);
if(departure_cp!=null && departure_dt_cp!=null) {

//此处只发送目的地和地址以显示月份价格预测数据
    /* 用XMLHTTPRequest来进行ajax异步数据交交互*/
//1.创建XMLHTTPRequest对象
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest;

        //针对某些特定版本的mozillar浏览器的bug进行修正。
        if (xmlhttp.overrideMimeType) {
            xmlhttp.overrideMimeType('text/xml');
        }
        ;

    } else if (window.ActiveXObject) {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    ;

//2.注册回调函数
//onreadystatechange是每次 readyState 属性改变的时候调用的事件句柄函数。

//xmlhttp.onreadystatechange = showmonthprice;

//3.设置连接信息
//初始化HTTP请求参数，但是并不发送请求。
//第一个参数连接方式，第二是url地址,第三个true是异步连接，默认是异步


//  xmlhttp.open("GET","请求数据的URL地址",true);

//使用post方式发送数据
    xmlhttp.open("POST", "/WhereToGo/price", true);

//post需要自己设置http的请求头,这里设置以浏览器原数据的形式发送
// xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset-UTF-8");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

//4，发送数据，开始和服务器进行交互
//发送 HTTP 请求，使用传递给 open() 方法的参数，以及传递给该方法的可选请求体。
//中如果true, send这句话会立即执行
//如果是false（同步），send会在服务器数据回来才执行
//xmlhttp.send(null);
    var depdes = new Object()

    depdes["citySelect01"] = departure_cp;
    depdes["datetimepicker1"] = departure_dt_cp;

    var depdess = JSON.stringify(depdes)

    console.log(depdess)

    try {
        xmlhttp.send(depdess);
    } catch (e) {
        console(e.message())
    }

    xmlhttp.onreadystatechange = function (ev) {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            //var mydata = JSON.stringify(xmlhttp.responseText);

            var mydata = JSON.parse(xmlhttp.responseText);

            //alert(mydata[1].departureCityName);

            for (var i = 0; i < mydata.length; i++) {
                data[i]={name: mydata[i].arrivalCityName,value: mydata[i].lowestPrice};
            }

            //alert(data[1].name+""+data[1].value);

           drawmap();
        }
    }
}


function drawmap() {
    var geoCoordMap = {
        '海门':[121.15,31.89],
        '鄂尔多斯':[109.781327,39.608266],
        '招远':[120.38,37.35],
        '舟山':[122.207216,29.985295],
        '齐齐哈尔':[123.97,47.33],
        '盐城':[120.13,33.38],
        '赤峰':[118.87,42.28],
        '青岛':[120.33,36.07],
        '乳山':[121.52,36.89],
        '金昌':[102.188043,38.520089],
        '泉州':[118.58,24.93],
        '莱西':[120.53,36.86],
        '日照':[119.46,35.42],
        '胶南':[119.97,35.88],
        '南通':[121.05,32.08],
        '拉萨':[91.11,29.97],
        '云浮':[112.02,22.93],
        '梅州':[116.1,24.55],
        '文登':[122.05,37.2],
        '上海':[121.48,31.22],
        '攀枝花':[101.718637,26.582347],
        '威海':[122.1,37.5],
        '承德':[117.93,40.97],
        '厦门':[118.1,24.46],
        '汕尾':[115.375279,22.786211],
        '潮州':[116.63,23.68],
        '丹东':[124.37,40.13],
        '太仓':[121.1,31.45],
        '曲靖':[103.79,25.51],
        '烟台':[121.39,37.52],
        '福州':[119.3,26.08],
        '瓦房店':[121.979603,39.627114],
        '即墨':[120.45,36.38],
        '抚顺':[123.97,41.97],
        '玉溪':[102.52,24.35],
        '张家口':[114.87,40.82],
        '阳泉':[113.57,37.85],
        '莱州':[119.942327,37.177017],
        '湖州':[120.1,30.86],
        '汕头':[116.69,23.39],
        '昆山':[120.95,31.39],
        '宁波':[121.56,29.86],
        '湛江':[110.359377,21.270708],
        '揭阳':[116.35,23.55],
        '荣成':[122.41,37.16],
        '连云港':[119.16,34.59],
        '葫芦岛':[120.836932,40.711052],
        '常熟':[120.74,31.64],
        '东莞':[113.75,23.04],
        '河源':[114.68,23.73],
        '淮安':[119.15,33.5],
        '泰州':[119.9,32.49],
        '南宁':[108.33,22.84],
        '营口':[122.18,40.65],
        '惠州':[114.4,23.09],
        '江阴':[120.26,31.91],
        '蓬莱':[120.75,37.8],
        '韶关':[113.62,24.84],
        '嘉峪关':[98.289152,39.77313],
        '广州':[113.23,23.16],
        '延安':[109.47,36.6],
        '太原':[112.53,37.87],
        '清远':[113.01,23.7],
        '中山':[113.38,22.52],
        '昆明':[102.73,25.04],
        '寿光':[118.73,36.86],
        '盘锦':[122.070714,41.119997],
        '长治':[113.08,36.18],
        '深圳':[114.07,22.62],
        '珠海':[113.52,22.3],
        '宿迁':[118.3,33.96],
        '咸阳':[108.72,34.36],
        '铜川':[109.11,35.09],
        '平度':[119.97,36.77],
        '佛山':[113.11,23.05],
        '海口':[110.35,20.02],
        '江门':[113.06,22.61],
        '章丘':[117.53,36.72],
        '肇庆':[112.44,23.05],
        '大连':[121.62,38.92],
        '临汾':[111.5,36.08],
        '吴江':[120.63,31.16],
        '石嘴山':[106.39,39.04],
        '沈阳':[123.38,41.8],
        '苏州':[120.62,31.32],
        '茂名':[110.88,21.68],
        '嘉兴':[120.76,30.77],
        '长春':[125.35,43.88],
        '胶州':[120.03336,36.264622],
        '银川':[106.27,38.47],
        '张家港':[120.555821,31.875428],
        '三门峡':[111.19,34.76],
        '锦州':[121.15,41.13],
        '南昌':[115.89,28.68],
        '柳州':[109.4,24.33],
        '三亚':[109.511909,18.252847],
        '自贡':[104.778442,29.33903],
        '吉林':[126.57,43.87],
        '阳江':[111.95,21.85],
        '泸州':[105.39,28.91],
        '西宁':[101.74,36.56],
        '宜宾':[104.56,29.77],
        '呼和浩特':[111.65,40.82],
        '成都':[104.06,30.67],
        '大同':[113.3,40.12],
        '镇江':[119.44,32.2],
        '桂林':[110.28,25.29],
        '张家界':[110.479191,29.117096],
        '宜兴':[119.82,31.36],
        '北海':[109.12,21.49],
        '西安':[108.95,34.27],
        '金坛':[119.56,31.74],
        '东营':[118.49,37.46],
        '牡丹江':[129.58,44.6],
        '遵义':[106.9,27.7],
        '绍兴':[120.58,30.01],
        '扬州':[119.42,32.39],
        '常州':[119.95,31.79],
        '潍坊':[119.1,36.62],
        '重庆':[106.54,29.59],
        '台州':[121.420757,28.656386],
        '南京':[118.78,32.04],
        '滨州':[118.03,37.36],
        '贵阳':[106.71,26.57],
        '无锡':[120.29,31.59],
        '本溪':[123.73,41.3],
        '克拉玛依':[84.77,45.59],
        '渭南':[109.5,34.52],
        '马鞍山':[118.48,31.56],
        '宝鸡':[107.15,34.38],
        '焦作':[113.21,35.24],
        '句容':[119.16,31.95],
        '北京':[116.46,39.92],
        '徐州':[117.2,34.26],
        '衡水':[115.72,37.72],
        '包头':[110,40.58],
        '绵阳':[104.73,31.48],
        '乌鲁木齐':[87.68,43.77],
        '枣庄':[117.57,34.86],
        '杭州':[120.19,30.26],
        '淄博':[118.05,36.78],
        '鞍山':[122.85,41.12],
        '溧阳':[119.48,31.43],
        '库尔勒':[86.06,41.68],
        '安阳':[114.35,36.1],
        '开封':[114.35,34.79],
        '济南':[117,36.65],
        '德阳':[104.37,31.13],
        '温州':[120.65,28.01],
        '九江':[115.97,29.71],
        '邯郸':[114.47,36.6],
        '临安':[119.72,30.23],
        '兰州':[103.73,36.03],
        '沧州':[116.83,38.33],
        '临沂':[118.35,35.05],
        '南充':[106.110698,30.837793],
        '天津':[117.2,39.13],
        '富阳':[119.95,30.07],
        '泰安':[117.13,36.18],
        '诸暨':[120.23,29.71],
        '郑州':[113.65,34.76],
        '哈尔滨':[126.63,45.75],
        '聊城':[115.97,36.45],
        '芜湖':[118.38,31.33],
        '唐山':[118.02,39.63],
        '平顶山':[113.29,33.75],
        '邢台':[114.48,37.05],
        '德州':[116.29,37.45],
        '济宁':[116.59,35.38],
        '荆州':[112.239741,30.335165],
        '宜昌':[111.3,30.7],
        '义乌':[120.06,29.32],
        '丽水':[119.92,28.45],
        '洛阳':[112.44,34.7],
        '秦皇岛':[119.57,39.95],
        '株洲':[113.16,27.83],
        '石家庄':[114.48,38.03],
        '莱芜':[117.67,36.19],
        '常德':[111.69,29.05],
        '保定':[115.48,38.85],
        '湘潭':[112.91,27.87],
        '金华':[119.64,29.12],
        '岳阳':[113.09,29.37],
        '长沙':[113,28.21],
        '衢州':[118.88,28.97],
        '廊坊':[116.7,39.53],
        '菏泽':[115.480656,35.23375],
        '合肥':[117.27,31.86],
        '武汉':[114.31,30.52],
        '大庆':[125.03,46.58]
    };

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };

    option = {
        title: {
            text: '往哪飞——'+departure_cp+''+departure_dt_cp+'——全国低价地图',
            left: 'center'
        },
        tooltip : {
            trigger: 'item'
        },
        bmap: {
            center: [104.114129, 37.550339],
            zoom: 5,
            roam: true,
            mapStyle: {
                styleJson: [{
                    'featureType': 'water',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'land',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#f3f3f3'
                    }
                }, {
                    'featureType': 'railway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fdfdfd'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'poi',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'green',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'subway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'manmade',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'local',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'boundary',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'building',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'label',
                    'elementType': 'labels.text.fill',
                    'stylers': {
                        'color': '#999999'
                    }
                }]
            }
        },
        series : [
            {
                name: '机票价格',
                type: 'scatter',
                coordinateSystem: 'bmap',
                data: convertData(data),
                symbolSize: function () {
                    return 5;
                },
                encode: {
                    value: 2
                },
                label: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                itemStyle: {
                    color: 'purple'
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            },
            {
                name: '推荐Top 5',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: convertData(data.sort(function (a, b) {
                    return a.value - b.value;
                }).slice(0, 5)),
                symbolSize: function (val) {
                    return 20;
                },
                encode: {
                    value: 2
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                },
                itemStyle: {
                    color: 'red',
                    shadowBlur: 10,
                    shadowColor: '#333'
                },
                zlevel: 1
            }
        ]
    };

    if (option && typeof option === "object") {
        myChart.setOption(option, true);

        myChart.on("click",function(param){

            var username = sessionStorage.getItem("username")

           if (username==null||username==""||username==undefined){
                alert("请先登录！")
               return;
            }

            var departure = departure_cp
            var time = departure_dt_cp
            var destination = param.name
            if(departure==""||departure==null){
                alert("请输入出发地！")
                return;
            }

            if (time==null||time==""){
                alert("请输入出发时间！")
            }

            sessionStorage.setItem('from_city', departure);
            sessionStorage.setItem('from_dt', time);
            sessionStorage.setItem('to_city',destination);

            window.location.href = "searchresult.html";
        })
    }
    //myChart.setOption(data,true);
    //           $("#myChart").removeAttr("_echarts_instance_").empty();  //这是之前询问到的，重新绘制图表的函数，但是不能使用
    //           if (option && typeof option === "object") {
    //               myChart.setOption(option, true);
    //           }
}
// alert(departure[0])
// alert(price[0])
// alert(data);
// alert(data[1].name+" "+data[1].value);

//  var cityname=["武汉","上海","拉萨","昆明","哈尔滨","太原","沈阳"];
// data[0]={name:cityname[0], value: 200};
// data[1]={name:cityname[1], value: 500};
// data[2]={name: cityname[2], value:400};
// data[3]={name: cityname[3], value:600};
// data[4]={name: cityname[4], value:700};
// data[5]={name: cityname[5], value:800};
// data[6]={name: cityname[6], value:900};
//
// var datacp = localStorage.getItem('msg');
//

// var xmlHttp = new XMLHttpRequest();
//
// xmlHttp.onreadystatechange = function (ev) {
//     if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
//         var rep = JSON.parse(xmlHttp.responseText);
//
//         for (var i = 0; i < rep.length; i++) {
//             data[i] = {name: rep[i].departureCityName, value: rep[i].lowestPrice};
//         }
//     }
// }
// xmlHttp.open('POST', '/WhereToGo/price', true)
// xmlHttp.send();


var from;
var fromdt;
window.onload = function() {
    from = document.getElementById("citySelect01"); //出发地
    fromdt = document.getElementById("datetimepicker1");//出发时间
}

function checkfromdt() {
    var regex = new RegExp("^(?:(?:([0-9]{4}(.|-|\/)(?:(?:0?[1,3-9]|1[0-2])(.|-|\/)(?:29|30)|((?:0?[13578]|1[02])(.|-|\/)31)))|([0-9]{4}(.|-|\/)(?:0?[1-9]|1[0-2])(.|-|\/)(?:0?[1-9]|1\\d|2[0-8]))|(((?:(\\d\\d(?:0[48]|[2468][048]|[13579][26]))|(?:0[48]00|[2468][048]00|[13579][26]00))(.|-|\/)0?2(.|-|\/)29))))$");
    console.log(fromdt)
    str1 = fromdt.value;
    console.log(str1)

    if (str1 == "") {
        return false;
    } else if (!regex.test(str1)) {
        return false;
    } else {
        return true;
    }
}


function checkfrom() {
    str1 = from.value;
    if (str1 == "") {
        return false;
    } else {
        return true;
    }
}

//
function sendmess() {

    var citySelect01 = $("#citySelect01").val()
    var datetimepicker1 = $("#datetimepicker1").html()

    sessionStorage.setItem('mydeparture', citySelect01);
    sessionStorage.setItem('mydeparturedt', datetimepicker1);
    window.location.href = "wheretogo.html";//重定向到当前页面



 //    //此处只发送目的地和地址以显示月份价格预测数据
 //    /* 用XMLHTTPRequest来进行ajax异步数据交交互*/
 //    //1.创建XMLHTTPRequest对象
 //     var xmlhttp;
 //    if (window.XMLHttpRequest) {
 //        // code for IE7+, Firefox, Chrome, Opera, Safari
 //        xmlhttp = new XMLHttpRequest;
 //
 //        //针对某些特定版本的mozillar浏览器的bug进行修正。
 //        if (xmlhttp.overrideMimeType) {
 //            xmlhttp.overrideMimeType('text/xml');
 //        }
 //        ;
 //
 //    } else if (window.ActiveXObject) {
 //        // code for IE6, IE5
 //        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
 //    }
 //    ;
 //
 //    //2.注册回调函数
 //    //onreadystatechange是每次 readyState 属性改变的时候调用的事件句柄函数。
 //
 //    //xmlhttp.onreadystatechange = showmonthprice;
 //
 //    //3.设置连接信息
 //    //初始化HTTP请求参数，但是并不发送请求。
 //    //第一个参数连接方式，第二是url地址,第三个true是异步连接，默认是异步
 //
 //
 //    //  xmlhttp.open("GET","请求数据的URL地址",true);
 //
 //    //使用post方式发送数据
 //    xmlhttp.open("POST", "/WhereToGo/price", true);
 //
 //    //post需要自己设置http的请求头,这里设置以浏览器原数据的形式发送
 //    // xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset-UTF-8");
 //    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
 //
 //    //4，发送数据，开始和服务器进行交互
 //    //发送 HTTP 请求，使用传递给 open() 方法的参数，以及传递给该方法的可选请求体。
 //    //中如果true, send这句话会立即执行
 //    //如果是false（同步），send会在服务器数据回来才执行
 //    //xmlhttp.send(null);
 //    var depdes = new Object()
 //
 //    depdes["citySelect01"] = citySelect01;
 //    depdes["datetimepicker1"] = datetimepicker1;
 //
 //    var depdess = JSON.stringify(depdes)
 //
 //    console.log(depdess)
 //
 //    try {
 //        xmlhttp.send(depdess);
 //    } catch (e) {
 //        console(e.message())
 //    }
 //
 //    xmlhttp.onreadystatechange = function (ev) {
 //        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
 //
 //            var mydata = JSON.stringify(xmlhttp.responseText);
 //
 //            var mymdata = JSON.parse(xmlhttp.responseText);
 //
 //           // alert(mydata);
 //            alert(mymdata[1].departureCityName);
 //
 //            sessionStorage.setItem('mydata', mymdata);
 //
 //            var test01 = sessionStorage.getItem('mydata');
 //
 //            alert(test01[1].departureCityname);
 //
 //            window.location.href = "hotels.html";//重定向到当前页面
 //
 //            //myChart.setOption(data,true);
 // //           $("#myChart").removeAttr("_echarts_instance_").empty();  //这是之前询问到的，重新绘制图表的函数，但是不能使用
 // //           if (option && typeof option === "object") {
 // //               myChart.setOption(option, true);
 // //           }
 //        }
 //    }

}





//这是搜索button调用的函，你在这里发出查询请求是不是要返回数据过来呢
//dui//你先用ajax把数据拿到

function checkall() {

    var departure = $("#citySelect01").val(); //出发地
    var time = $("#datetimepicker1");//出发时间

    if (departure!=null&&departure!=""||departure!=undefined&&time!=""&&time!=undefined&&time!=null) {
        sendmess();

        //localStorage.clear();
        //localStorage.setItem('msg', data);
    } else {
        alert("出发地或出发时间错误！！！");
    }
}


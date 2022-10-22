//定义图标全局变量
var godayChart=null
var backdayChart=null
var monthChart=null
var res=null
var xmlhttp=null
var monthprices=null




//当用户点击月份的柱状图的时候再显示 去程 和 返程

function showmonthprice(){
	//判断对象状态是交互完成，接收服务器返回的数据
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
		//["dada","xiaoyin","liujie"]
		//纯文本的数据
		var responseText = xmlhttp.responseText;


		if(responseText=="" && responseText==null) {
			return;
		}

		//6.将服务器的数据显示在客户端
		monthprices=JSON.parse(responseText);

		// 基于准备好的dom，初始化echarts实例
		//	var myChart = echarts.init(document.getElementById("monthprice"));
		if (monthChart == null ||monthChart == undefined) {
			$("#monthprice").text("")
			monthChart = echarts.init(document.getElementById("monthprice"));

			monthChart.on("click", function (param) {
				console.log("x轴标签： " + param.name + "数据： " + param.data);
				$("#month-choose").html(param.name)
				$("#godaywrap").css({"display": "flex"})
				$("#backdaywrap").css({"display": "flex"})
				var month = param.name;
				// var m = parseInt(month);
				showgodayprice(month)
				showbackdayprice(month)
			});
		}

		monthp = monthprices["monthprice"]
		var months = []
		var pricess = []

		for(var key in monthp){
			months.push(key);
			pricess.push(monthp[key])
		}


		// 指定图表的配置项和数据
		var option = {
			// 标题
			title: {
				text: '月份价格',
				left: 20,
				top: 10
			},
			// 工具箱
			toolbox: {
				top: 10,
				right: 50,
				show: true,
				feature: {
					saveAsImage: {
						show: true
					},
					restore: {
						show: true
					},
					dataView: {
						show: true
					},
					dataZoom: {
						show: true
					},
					magicType: {
						type: ['line', 'bar']
					}

				}
			},
			grid: {
				show: true,
				backgroundColor: "#FFF",//设置图表背景色（注：如果使用背景色必须配合show:true）
				top: 50,
				bottom: 50,
				left: 50,
				right: 70
			},
			tooltip: {
				trigger: 'axis'
			},
			// x轴
			xAxis: {
				data: months
			},
			yAxis: {},
			// 数据
			series: [{
				name: '月最低',
				type: 'bar',
				data: pricess,
			}
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		monthChart.setOption(option,true);


	}
}

function showgodayprice(month){
	console.log("showgodays: "+month)
	// 基于准备好的dom，初始化echarts实例
	if(godayChart==null||godayChart==undefined) {
		godayChart = echarts.init(document.getElementById("godayprice"));
		godayChart.on("click",function(param){
			var go = $("#choose-go-time").html(param.name)
			$("#goday-choose").html(param.name)
			showbackdayprice1(param.name)
		})
	}
	godaypricess = monthprices["godayprice"]
	var days = []
	var pricess = []

	var ym = month.toString().split("-")

	console.log(month)
	console.log(ym)
	days = getDaysInMonth(ym[0],ym[1])

	var dayl = days.length
	for(var i=0;i<dayl;i++){
		pricess.push(0);
	}

	for(var key in godaypricess){
		for(var i=0;i<dayl;i++){
			if(days[i].indexOf(key)==0){
				pricess[i] = godaypricess[key]
			}
		}
	}

	console.log(days)
	console.log(pricess)

	// 指定图表的配置项和数据
	var option = {
		// 标题
		title: {
			text: '出发日价格',
			left: 20,
			top: 10
		},
		// 工具箱
		toolbox: {
			top: 10,
			right: 50,
			show: true,
			feature: {
				saveAsImage: {
					show: true
				},
				restore: {
					show: true
				},
				dataView: {
					show: true
				},
				dataZoom: {
					show: true
				},
				magicType: {
					type: ['line', 'bar']
				}

			}
		},
		grid: {
			show: true,
			backgroundColor: "#FFF",//设置图表背景色（注：如果使用背景色必须配合show:true）
			top: 50,
			bottom: 50,
			left: 50,
			right: 70
		},
		tooltip: {
			trigger: 'axis'
		},
		// x轴
		xAxis: {
			data: days,
		},
		yAxis: {},
		// 数据
		series: [{
			name: '去程日低价',
			type: 'bar',
			data: pricess,
		}
		]
	};
	// 使用刚指定的配置项和数据显示图表。
	godayChart.setOption(option);
}
						
function showbackdayprice(month){
	console.log("showbackdays: "+month)
	// 基于准备好的dom，初始化echarts实例
	if(backdayChart==null) {
		backdayChart = echarts.init(document.getElementById("backdayprice"));
	}

	godaypricess = monthprices["backdayprice"]
	var days = []
	var pricess = []

	var ym = month.toString().split('-')
	days = getDaysInMonth(ym[0],ym[1])

	var dayl = days.length
	for(var i=0;i<dayl;i++){
		pricess.push(0.0);
	}

	for(var key in godaypricess){
		for(var i=0;i<dayl;i++){
			if(days[i].indexOf(key)==0){
				pricess[i] = godaypricess[key]
			}
		}
	}

	// 指定图表的配置项和数据
	var option = {
		// 标题
		title: {
			text: '返回日价格',
			left:20,
			top:10
		},
		// 工具箱
		toolbox: {
			top:10,
			right:50,
			show: true,
			feature:{
				saveAsImage:{
					show:true
				},
				restore:{
					show:true
				},
				dataView:{
					show:true
				},
				dataZoom:{
					show:true
				},
				magicType:{
					type:['line','bar']
				}

			}
		},
		grid:{
			show: true,
			backgroundColor:"#FFF",//设置图表背景色（注：如果使用背景色必须配合show:true）
			top:50,
			bottom:50,
			left:50,
			right:70
		},
		tooltip:{
			trigger:'axis'
		},
		// x轴
		xAxis: {
			data: days
		},
		yAxis: {},
		// 数据
		series: [{
			name: '返程日最低',
			type: 'bar',
			data: pricess,
		}
		]
	};

	// 使用刚指定的配置项和数据显示图表。
	backdayChart.setOption(option);

	backdayChart.on("click",function(param){
		$("#choose-back-time").html(param.name)
		$("#backday-choose").html(param.name)
	})

}


function showbackdayprice1(ymdstr){
	console.log("showbackdays: "+ymdstr)
	// 基于准备好的dom，初始化echarts实例
	if(backdayChart==null) {
		backdayChart = echarts.init(document.getElementById("backdayprice"));

		backdayChart.on("click",function(param){
			$("#choose-back-time").html(param.name)
			$("#backday-choose").html(param.name)
		})
	}

	godaypricess = monthprices["backdayprice"]
	var days = []
	var pricess = []

	days = get30Days(ymdstr)

	var dayl = days.length
	for(var i=0;i<dayl;i++){
		pricess.push(0.0);
	}

	for(var key in godaypricess){
		for(var i=0;i<dayl;i++){
			if(days[i].indexOf(key)==0){
				pricess[i] = godaypricess[key]
			}
		}
	}

	// 指定图表的配置项和数据
	var option = {
		// 标题
		title: {
			text: '返回日价格',
			left:20,
			top:10
		},
		// 工具箱
		toolbox: {
			top:10,
			right:50,
			show: true,
			feature:{
				saveAsImage:{
					show:true
				},
				restore:{
					show:true
				},
				dataView:{
					show:true
				},
				dataZoom:{
					show:true
				},
				magicType:{
					type:['line','bar']
				}

			}
		},
		grid:{
			show: true,
			backgroundColor:"#FFF",//设置图表背景色（注：如果使用背景色必须配合show:true）
			top:50,
			bottom:50,
			left:50,
			right:70
		},
		tooltip:{
			trigger:'axis'
		},
		// x轴
		xAxis: {
			data: days
		},
		yAxis: {},
		// 数据
		series: [{
			name: '返程日最低',
			type: 'bar',
			data: pricess,
		}
		]
	};

	// 使用刚指定的配置项和数据显示图表。
	backdayChart.setOption(option);
}

//计算某个日期后面三十天的时期数组
function get30Days(timestr){

	var ymd = timestr.toString().split("-")
	const days30 =[]
	var date= new Date(ymd[0],ymd[1],ymd[2]); //转换成Data();
	var date1 = new Date(date)

	for(var i=0;i<30;i++){
		var befminuts = date.getTime() + 1000 * 60 * 60 * 24 * parseInt(i);//计算前几天用减，计算后几天用加，最后一个就是多少天的数量 n为向前或者向后天数
		date1.setTime(befminuts)
		days30.push(date1.getFullYear() + "-" + (date1.getMonth()) + "-" + date1.getDate());
	}

	return days30;
}



//根据某年某月计算出具体日期
function getDaysInMonth(year, month) {
	var daysOfMonth = [];
	month = parseInt(month, 10);
	var lastDayOfMonth = new Date(year, month, 0).getDate();

	for (let i = 1; i <= lastDayOfMonth; i++) {
		// if (i < 10) {
		// 	daysOfMonth.push(year+"."+month+"-"+"0" + i);
		// } else {
		daysOfMonth.push(year+"-"+month+"-"+i);
		// }
	}
	return daysOfMonth;
}

function whentoflysearch(){

	$("#godaywrap").css({"display": "none"})
	$("#backdaywrap").css({"display": "none"})
	var departure=$("#departure").val()
	var destination = $("#destination").val()
	// alert(departure+"  到  "+destination)
	
	//判断出发地是否为空
	if(departure==""||departure==undefined||departure==null){
		alert("出发地为空,请选择出发地!!!")
		return;
	}
	
	//判断目的地是否为空
	if(departure==""||departure==undefined||departure==null){
		alert("目的地为空,请选择目的地!!!")
		return;
	}
	
	
	$(".depname").html(departure)
	$(".desname").html(destination)
	$(".title-bar-wrap").css("display","flex")
	
	//此处只发送目的地和地址以显示月份价格预测数据
	/* 用XMLHTTPRequest来进行ajax异步数据交交互*/
	//1.创建XMLHTTPRequest对象
	// var xmlhttp;
	if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest;

        //针对某些特定版本的mozillar浏览器的bug进行修正。
        if (xmlhttp.overrideMimeType) {
              xmlhttp.overrideMimeType('text/xml');
        };

    } else if (window.ActiveXObject){
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    };

    //2.注册回调函数
    //onreadystatechange是每次 readyState 属性改变的时候调用的事件句柄函数。
	xmlhttp.onreadystatechange = showmonthprice;

    //3.设置连接信息
    //初始化HTTP请求参数，但是并不发送请求。
    //第一个参数连接方式，第二是url地址,第三个true是异步连接，默认是异步


	//  xmlhttp.open("GET","请求数据的URL地址",true);

    //使用post方式发送数据
	xmlhttp.open("POST","/flytimepredict/monthprice",true);

    //post需要自己设置http的请求头,这里设置以浏览器原数据的形式发送
	// xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset-UTF-8");
    xmlhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");

    //4，发送数据，开始和服务器进行交互
    //发送 HTTP 请求，使用传递给 open() 方法的参数，以及传递给该方法的可选请求体。
    //中如果true, send这句话会立即执行
    //如果是false（同步），send会在服务器数据回来才执行
    //xmlhttp.send(null);
	var depdes = new Object()
	depdes["departure"] = departure;
	depdes["destination"] = destination;
	var depdess = JSON.stringify(depdes)

	console.log(depdess)

	try{
		xmlhttp.send(depdess);
	}
	catch (e) {
		console(e.message())
	}


}

//该函数获取到用户选择的地点和日期以后跳转到搜索结果界面
function flySearch(){
	var username = sessionStorage.getItem("username")
	if(username==null||username==""){
		alert("请先登录！")
		return;
	}

	//获取用户选择数据进行往返程查找
	var departure=$("#departure").val()
	var destination = $("#destination").val()
	alert(departure+"  到  "+destination)


	var gotime = $("#choose-go-time").html()
	var backtime = $("#choose-back-time").html()

	//判断出发地是否为空
	if(departure==""||departure==undefined||departure==null){
		alert("出发地为空,请选择出发地!!!")
		return;
	}

	//判断目的地是否为空
	if(departure==""||departure==undefined||departure==null){
		alert("目的地为空,请选择目的地!!!")
		return;
	}

	if(gotime=="请选择启程时间"||gotime==null){
		alert("请选择出发时间!!!")
		return;
	}
	if(backtime=="请选择返程时间"||backtime==null){
		alert("请选择返回时间!!!")
		return;
	}

	sessionStorage.setItem('from_city', departure);
	sessionStorage.setItem('from_dt', gotime);
	sessionStorage.setItem('to_city',destination);
	sessionStorage.setItem('back_dt',backtime);

	window.location.href="go_display.html";
}

//showmonthprice()
//showgodayprice()
//showbackdayprice()






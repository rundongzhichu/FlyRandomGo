var godayChart=null
var backdayChart=null
var monthChart=null
var res=null
var xmlhttp=null

var trips;
var from;
var to;
var fromdt;
var todt;
var type;
var adults;
var children;
var searchbtn;
var form;
window.onload = function() {

//	trips = document.getElementsByName("trips01"); //单程1 or 往返2 多程3
//	trips = $('input:radio[name="trips01"]:checked').val(); //单程1 or 往返2 多程3
    from = document.getElementById("citySelect01"); //出发地
    to = document.getElementById("citySelect02");//目的地
    fromdt = document.getElementById("datetimepicker1");//出发时间
    todt = document.getElementById("datetimepicker2");//返程时间
    type = document.getElementById("cabin");//机型
    adults = document.getElementById("adults");//成人乘客数
    children = document.getElementById("children");//儿童乘客数
    searchbtn = document.getElementById("searchbtn1");//搜索按钮
    form = document.getElementById("form01");//表单
}
function checkfromdt() {
    var regex = new RegExp("^(?:(?:([0-9]{4}(.|-|\/)(?:(?:0?[1,3-9]|1[0-2])(.|-|\/)(?:29|30)|((?:0?[13578]|1[02])(.|-|\/)31)))|([0-9]{4}(.|-|\/)(?:0?[1-9]|1[0-2])(.|-|\/)(?:0?[1-9]|1\\d|2[0-8]))|(((?:(\\d\\d(?:0[48]|[2468][048]|[13579][26]))|(?:0[48]00|[2468][048]00|[13579][26]00))(.|-|\/)0?2(.|-|\/)29))))$");
    str1 = fromdt.value;

    if (str1 == "") {
        return false;
    } else if (!regex.test(str1)) {
        return false;
    } else {
        return true;
    }
}

function checktodt() {
    var regex = new RegExp("^(?:(?:([0-9]{4}(.|-|\/)(?:(?:0?[1,3-9]|1[0-2])(.|-|\/)(?:29|30)|((?:0?[13578]|1[02])(.|-|\/)31)))|([0-9]{4}(.|-|\/)(?:0?[1-9]|1[0-2])(.|-|\/)(?:0?[1-9]|1\\d|2[0-8]))|(((?:(\\d\\d(?:0[48]|[2468][048]|[13579][26]))|(?:0[48]00|[2468][048]00|[13579][26]00))(.|-|\/)0?2(.|-|\/)29))))$");
    str1 = todt.value;

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

function checkto() {
    str1 = from.value;

    if (str1 == "") {
        return false;
    } else {
        return true;
    }
}

function checkall() {
    trips = $('input:radio[name="trips01"]:checked').val();
    if(trips=='单程')
    {
        if (checkfrom() && checkto() && checkfromdt()) {
            sendmess();
            window.location.href = "searchresult.html";
        }
        else {
            alert("存在不合法输入！！！");
            window.location.href = "flight01.html";
        }
    }
    else
    {
        if (checkfrom() && checkto() && checkfromdt() && checktodt()) {
            sendmess();
            window.location.href="go_display.html";
        } else {
            alert("存在不合法输入！！！");
            window.location.href = "flight01.html";
        }
    }

}


function sendmess() {
    var citySelect01 = $("#citySelect01").val()
    var datetimepicker1 = $("#datetimepicker1").val()
    var citySelect02 = $("#citySelect02").val()
    var datetimepicker2 = $("#datetimepicker2").val()

    // sessionStorage.clear();
    sessionStorage.setItem('from_city', citySelect01);
    sessionStorage.setItem('from_dt', datetimepicker1);
    sessionStorage.setItem('to_city', citySelect02);
    sessionStorage.setItem('back_dt', datetimepicker2);
}

function multtrips() {

    window.location.href="flight.html";

}

/*
	function sendmess() {

		var citySelect01 = $("#citySelect01").val()
		var citySelect02 = $("#citySelect02").val()
		var datetimepicker1 = $("#datetimepicker1").val()
		var datetimepicker2 = $("#datetimepicker2").val()
		var cabin = $("#cabin").val()
		var adults = $("#adults").val()
		var children = $("#children").val()
		//var trips01= $("input[name='trips01']").val()
		var trips01 = $('input:radio[name="trips01"]:checked').val();
		//此处只发送目的地和地址以显示月份价格预测数据

		//1.创建XMLHTTPRequest对象
		// var xmlhttp;
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
		xmlhttp.open("POST", "/flightsearch/flight", true);

		//post需要自己设置http的请求头,这里设置以浏览器原数据的形式发送
		// xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset-UTF-8");
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

		//4，发送数据，开始和服务器进行交互
		//发送 HTTP 请求，使用传递给 open() 方法的参数，以及传递给该方法的可选请求体。
		//中如果true, send这句话会立即执行
		//如果是false（同步），send会在服务器数据回来才执行
		//xmlhttp.send(null);
		var depdes = new Object()
		// String departure = jsonObject.getString("citySelect01");
		// String destination = jsonObject.getString("citySelect02");
		// String totime = jsonObject.getString("datetimepicker1");
		// String backtime = jsonObject.getString("datetimepicker2");
		// String cabin = jsonObject.getString("cabin");
		// String adults = jsonObject.getString("adults");
		// String children = jsonObject.getString("children");
		depdes["citySelect01"] = citySelect01;
		depdes["citySelect02"] = citySelect02;
		depdes["datetimepicker1"] = datetimepicker1;
		depdes["datetimepicker2"] = datetimepicker2;
		depdes["cabin"] = cabin;
		depdes["adults"] = adults;
		depdes["children"] = children;
		depdes["trips01"] = trips01;

		var depdess = JSON.stringify(depdes)

		console.log(depdess)

		try {
			xmlhttp.send(depdess);
		} catch (e) {
			console(e.message())
		}

	}

*/


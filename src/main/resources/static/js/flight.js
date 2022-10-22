function go(){
	$(".go").css({"display":"flex"})
	$(".goandback").css({"display":"none"})
	$(".multipass").css({"display":"none"})
}

function goandback(){
	$(".go").css({"display":"none"})
	$(".goandback").css({"display":"flex"})
	$(".multipass").css({"display":"none"})
}

function multipass(){
	$(".go").css({"display":"none"})
	$(".goandback").css({"display":"none"})
	$(".multipass").css({"display":"flex"})
}

var passes =2;
function addpass(){
	if(passes>=3){
		alert("最多添加3程");
		return ;
	}else{
		passes+=1;
		$(".multipasswrap").append('<div class="multipa"><div class="place-infos"><input autocomplete="off" id="multipassdepartue2" placeholder="请输入出发地" /><input autocomplete="off" id="multipassdestination2" placeholder="请输入目的地" /></div><div class="time-infos"><span id="multipassdepartuetime2" onClick="return Calendar(\'multipassdepartuetime2\');" >出发日期</span></div><div class="deletepass"><span onclick="deletepass(this)">删除</span></div></div>')

		new Vcity.CitySelector({input:'multipassdepartue2'});
		new Vcity.CitySelector({input:'multipassdestination2'});

	}
}

function deletepass(e){
	if(passes==2){
		alert("删除完毕！")
		return;
	}
	passes--;
	$(e).parent().parent().remove()
}

new Vcity.CitySelector({input:'godepartue'});
new Vcity.CitySelector({input:'godestination'});
new Vcity.CitySelector({input:'goandbackdepartue'});
new Vcity.CitySelector({input:'goandbackdestination'});
new Vcity.CitySelector({input:'multipassdepartue0'});
new Vcity.CitySelector({input:'multipassdestination0'});
new Vcity.CitySelector({input:'multipassdepartue1'});
new Vcity.CitySelector({input:'multipassdestination1'});


$(document).ready(function () {
	// $("#cabin-select").select2({
	// 	minimumResultsForSearch: -1
	// });
});


//页面完全加载完毕以后执行的函数
window.onload=function(){
	var username = window.sessionStorage.getItem("username")

	if(username==""||username==null||username ==undefined){
		alert("用户未登录！")
		return;
	}

	var jsonObj = {"username":username};
	console.log(JSON.stringify(jsonObj))
	/*
        Jquery默认Content-Type为application/x-www-form-urlencoded类型
     */
	$.ajax({
		type: 'POST',
		url: "/uv/recombyaccess",
		dataType: "json",
		data: JSON.stringify(jsonObj),
		contentType : "application/json",
		success: function(data) {
			console.log(data)
			if(data["status"]==200){
				alert(data["error"])

				//开始打印数据
				var da = data["res"]
				var length = da.length;

				for(var i=0;i<3;i++){

					$(".recommend-line1").children()[i].style.display="flex"

					var dom = $(".recommend-line1").children()[i].getElementsByTagName("p")[0]
					dom.getElementsByClassName("depname")[0].innerHTML=da[i]["deptCity"]
					dom.getElementsByClassName("desname")[0].innerHTML=da[i]["arrCity"]

					dom = $(".recommend-line1").children()[i].getElementsByTagName("p")[1]
					dom.getElementsByClassName("destime")[0].innerHTML=da[i]["deptDate"]

					dom = $(".recommend-line1").children()[i].getElementsByTagName("p")[2]
					dom.getElementsByClassName("price")[0].innerHTML=da[i]["minPrice"]
				}

				console.log(length)
				if (length>3){
					for(var i=0;i<3;i++){
						$(".recommend-line2").children()[i].style.display="flex"

						var dom = $(".recommend-line2").children()[i].getElementsByTagName("p")[0]
						dom.getElementsByClassName("depname")[0].innerHTML=da[i+3]["deptCity"]
						dom.getElementsByClassName("desname")[0].innerHTML=da[i+3]["arrCity"]

						dom = $(".recommend-line2").children()[i].getElementsByTagName("p")[1]
						dom.getElementsByClassName("destime")[0].innerHTML=da[i+3]["deptDate"]

						dom = $(".recommend-line2").children()[i].getElementsByTagName("p")[2]
						dom.getElementsByClassName("price")[0].innerHTML=da[i+3]["minPrice"]
					}
				}

				// window.location.href="/flight.html"
			}else{
				alert(data["error"])
			}

		},
		error: function(e) {
			console.log("fucking error")
		}
	});
}

function  quickbuy(e) {

	console.log(e.parentNode.parentNode.getElementsByTagName("p")[0].innerHTML)

	var dom = e.parentNode.parentNode.getElementsByTagName("p")[0]
	var dep = dom.getElementsByClassName("depname")[0].innerHTML
	var des = dom.getElementsByClassName("desname")[0].innerHTML

	dom = e.parentNode.parentNode.getElementsByTagName("p")[1]
	var time = dom.getElementsByClassName("destime")[0].innerHTML
	sessionStorage.setItem('from_city', dep);
	sessionStorage.setItem('from_dt', time);
	sessionStorage.setItem('to_city', des);

	window.location.href = "searchresult.html";
}


function  searchfly() {

	var username = sessionStorage.getItem("username");

	if(username==null&&username==""){
		alert("请先登录！")
		return;
	}
	var baby = $(".baby").prop("checked")?1:0;
	var child = $(".child").prop("checked")?1:0;
	var cabin1 = $('#cabin-select').find('option:selected').text();
	var cabin =0;
	switch (cabin1) {
		case "不限舱":
			cabin=0;
			break;
		case "经济舱":
			cabin=1;
			break;
		case "公务舱":
			cabin=2;
			break;
	}

	var condition = new Object()

	condition["baby"] = baby
	condition["child"] = child
	condition["cabin"] = cabin

	console.log(cabin)
	console.log(baby)
	console.log(child)
	console.log($('#cabin-select').find('option:selected').text());

	if($(".go").css("display")=="flex"){
		console.log("单程搜索");
		var godeparture = $("#godepartue").val()
		var godestination= $("#godestination").val()
		var departuredate = $("#godepartuetime").html()

		console.log(godeparture+">"+godestination+":"+departuredate)
		if(godeparture==null||godeparture==""){
			alert("出发城市名为空！")
			return;
		}

		if(godestination==null||godestination==""){
			alert("目的城市名为空！")
			return;
		}

		if(departuredate==null||departuredate==""){
			alert("请选择出发时间！")
			return;
		}

		sessionStorage.setItem('from_city', godeparture);
		sessionStorage.setItem('from_dt', departuredate);
		sessionStorage.setItem('to_city', godestination);

		window.location.href = "searchresult.html";
	}
	else if($(".goandback").css("display")=="flex"){
		console.log("往返搜索");
		var goandbackdeparture = $("#goandbackdepartue").val()
		var goandbackdestination = $("#goandbackdestination").val();
		var goandbackdeparturetime=$("#goandbackdeparturetime").html();
		var goandbackbacktime = $("#goandbackbacktime").html()


		console.log(""+goandbackdeparture+">"+goandbackdestination+":"+goandbackdeparturetime+":"+goandbackbacktime)

		if(goandbackdeparture==""||goandbackdeparture==null){
			alert("出发城市名为空！")
			return;
		}

		if(goandbackdestination==""||goandbackdestination==null){
			alert("目的城市名为空！")
			return;
		}

		if(goandbackdeparturetime==""||goandbackdeparturetime==null){
			alert("请选择出发时间！")
			return;
		}

		if(goandbackbacktime==""||goandbackbacktime==null){
			alert("请选择返程时间！")
			return;
		}

		sessionStorage.setItem('from_city', goandbackdeparture);
		sessionStorage.setItem('from_dt', goandbackdeparturetime);
		sessionStorage.setItem('to_city', goandbackdestination);
		sessionStorage.setItem('back_dt',goandbackbacktime );

		window.location.href="go_display.html";
	}
	else if($(".multipass").css("display")=="flex") {
		console.log("多程搜索");
		var res= new Object()
		var multipass = new Object()

		for(var i=0;i<passes;i++){
			var pass= new Object()
			var multipassdeparture = $("#multipassdepartue"+i).val()
			var multipassdestination = $("#multipassdestination"+i).val()
			var multipassdepartuetime = $("#multipassdepartuetime"+i).html()

			if(multipassdeparture==null||multipassdeparture==""){
				alert("出发城市名为空！")
				return;
			}

			if(multipassdestination==null||multipassdestination==""){
				alert("请选择出发时间！")
				return;
			}

			if(multipassdestination=="出发日期"||multipassdepartuetime==null||multipassdepartuetime==""){
				alert("请选择出发时间！")
				return;
			}
			pass["username"]=username
			pass["deptcity"] = multipassdeparture
			pass["arrcity"] = multipassdestination
			pass["deptdate"] = multipassdepartuetime
			multipass[i] =  pass;
		}

		res["multipass"] = multipass
		res["conditions"] = condition
		console.log(JSON.stringify(res))
		sessionStorage.setItem('param',JSON.stringify(res));
		window.location.href="multiflight.html"
	}
	else{
		alert("页面数据出错！")
	}
}























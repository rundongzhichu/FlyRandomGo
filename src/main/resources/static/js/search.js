var flightflag=[];
var airlineName1=[];
var craftTypeCode1=[];
var airlineName2=[] ;
var craftTypeCode2 =[];
var departureCityName=[];
var arrivalCityName=[];
var stayCityName =[];
var stayTIme=[];
var departureDate=[];
var arrivalDate =[];
var traivTime=[];
var price=[];
var rank=[];

function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}

function convertDateFromString(dateString) {
    if (dateString) {
        var arr1 = dateString.split(" ");
        var sdate = arr1[0].split('-');
        var date = new Date(sdate[0], sdate[1]-1, sdate[2]);
        return date;
    }
}
var city01 = sessionStorage.getItem('from_city');
var city02 = sessionStorage.getItem('to_city');
var date01 = sessionStorage.getItem('from_dt');
var date02 = sessionStorage.getItem('back_dt');
var username = sessionStorage.getItem("username")

// alert(datacp);
if(city01!=null && city02!=null && date01!=null) {



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
    xmlhttp.open("POST", "/flightsearch/flight01", true);

//post需要自己设置http的请求头,这里设置以浏览器原数据的形式发送
// xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset-UTF-8");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

//4，发送数据，开始和服务器进行交互
//发送 HTTP 请求，使用传递给 open() 方法的参数，以及传递给该方法的可选请求体。
//中如果true, send这句话会立即执行
//如果是false（同步），send会在服务器数据回来才执行
//xmlhttp.send(null);
    var depdes = new Object()

    depdes["citySelect01"] = city01;
    depdes["citySelect02"] = city02;
    depdes["datetimepicker1"] = date01;
    depdes["username"] = username
//    depdes["datetimepicker2"] = date02;

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

            //alert(mydata[1].joinFlag);

            for (var i = 0,j=0; i < mydata.length; i++) {
                if(mydata[i].joinFlag == 0)
                {
                    if(mydata[i].lowestCfPrice==null)
                    {
                        flightflag[j]=mydata[i].joinFlag;
                        airlineName1[j]=mydata[i].airlineName1;
                        craftTypeCode1[j]=mydata[i].flightNo1;
                        arrivalCityName[j]=mydata[i].arrivalAirportName;
                        departureCityName[j]=mydata[i].deptAirportName;
                        departureDate[j]=mydata[i].departureTime;
                        arrivalDate[j]=mydata[i].arrivalTime;
                        traivTime[j]=mydata[i].duration;
                        price[j]=PrefixInteger(mydata[i].lowestPrice,4);
                        rank[j]="经济舱";
                        j=j+1;
                    }
                    else
                    {
                        flightflag[j]=mydata[i].joinFlag;
                        airlineName1[j]=mydata[i].airlineName1;
                        craftTypeCode1[j]=mydata[i].flightNo1;
                        arrivalCityName[j]=mydata[i].arrivalAirportName;
                        departureCityName[j]=mydata[i].deptAirportName;
                        departureDate[j]=mydata[i].departureTime;
                        arrivalDate[j]=mydata[i].arrivalTime;
                        traivTime[j]=mydata[i].duration;
                        price[j]=PrefixInteger(mydata[i].lowestPrice,4);
                        rank[j]="经济舱";
                        j=j+1;
                        flightflag[j]=mydata[i].joinFlag;
                        airlineName1[j]=mydata[i].airlineName1;
                        craftTypeCode1[j]=mydata[i].flightNo1;
                        arrivalCityName[j]=mydata[i].arrivalAirportName;
                        departureCityName[j]=mydata[i].deptAirportName;
                        departureDate[j]=mydata[i].departureTime;
                        arrivalDate[j]=mydata[i].arrivalTime;
                        traivTime[j]=mydata[i].duration;
                        price[j]=PrefixInteger(mydata[i].lowestCfPrice,4);
                        rank[j]="头等舱";
                        j=j+1;
                    }
                }
                else
                {
                    if(mydata[i].lowestCfPrice==null)
                    {
                        flightflag[j]=mydata[i].joinFlag;
                        airlineName1[j]=mydata[i].airlineName1;
                        craftTypeCode1[j]=mydata[i].flightNo1;
                        airlineName2[j]=mydata[i].airlineName2;
                        craftTypeCode2[j]=mydata[i].flightNo2;
                        arrivalCityName[j]=mydata[i].arrivalAirportName;
                        stayCityName[j]=mydata[i].transmitCityName;
                        stayTIme[j]=mydata[i].durationTime;
                        departureCityName[j]=mydata[i].deptAirportName;
                        departureDate[j]=mydata[i].departureTime;
                        arrivalDate[j]=mydata[i].arrivalTime;
                        traivTime[j]=mydata[i].duration;
                        price[j]=PrefixInteger(mydata[i].lowestPrice,4);
                        rank[j]="经济舱";
                        j=j+1;
                    }
                    else
                    {
                        flightflag[j]=mydata[i].joinFlag;
                        airlineName1[j]=mydata[i].airlineName1;
                        craftTypeCode1[j]=mydata[i].flightNo1;
                        airlineName2[j]=mydata[i].airlineName2;
                        craftTypeCode2[j]=mydata[i].flightNo2;
                        arrivalCityName[j]=mydata[i].arrivalAirportName;
                        stayCityName[j]=mydata[i].transmitCityName;
                        stayTIme[j]=mydata[i].durationTime;
                        departureCityName[j]=mydata[i].deptAirportName;
                        departureDate[j]=mydata[i].departureTime;
                        arrivalDate[j]=mydata[i].arrivalTime;
                        traivTime[j]=mydata[i].duration;
                        price[j]=PrefixInteger(mydata[i].lowestPrice,4);
                        rank[j]="经济舱";
                        j=j+1;
                        flightflag[j]=mydata[i].joinFlag;
                        airlineName1[j]=mydata[i].airlineName1;
                        craftTypeCode1[j]=mydata[i].flightNo1;
                        airlineName2[j]=mydata[i].airlineName2;
                        craftTypeCode2[j]=mydata[i].flightNo2;
                        arrivalCityName[j]=mydata[i].arrivalAirportName;
                        stayCityName[j]=mydata[i].transmitCityName;
                        stayTIme[j]=mydata[i].durationTime;
                        departureCityName[j]=mydata[i].deptAirportName;
                        departureDate[j]=mydata[i].departureTime;
                        arrivalDate[j]=mydata[i].arrivalTime;
                        traivTime[j]=mydata[i].duration;
                        price[j]=PrefixInteger(mydata[i].lowestCfPrice,4);
                        rank[j]="头等舱";
                        j=j+1;
                    }
                }
            }

            //alert(airlineName1[0]);
            drawlist();
            //alert(data[1].name+""+data[1].value);

        }
    }
}
/**
xmlHttp.onreadystatechange = function (ev) {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        var rep = JSON.parse(xmlHttp.responseText);
        for (var i = 0; i < rep.length; i++) {
            airlineName1.push(rep[i].month + '月');
            craftTypeCode1.push(rep[i].total);
        }
    }
    xmlHttp.open('GET', '/uv/month', true)
    xmlHttp.send();
}
 */


function drawlist() {
    tdArr = document.getElementById('tb1').firstElementChild;
    for (var i = 0; i < airlineName1.length ; i++) {
        var tr = document.createElement("tr");
        if(flightflag[i] == 1)
        {
            tr.innerHTML = '<td class="txt1" name="td0">' + airlineName1[i] + craftTypeCode1[i] + '<br/>'+ airlineName2[i] + craftTypeCode2[i] +'</td><td class="txt2"name="td1">' + departureDate[i] + '<br/>' + departureCityName[i] + '</td><td class="txt3" name="td2">停留'+stayTIme[i]+'</br>——————————></br>转'+stayCityName[i]+'</td><td class="txt2" name="td3">' + arrivalDate[i] + '<br/>' + arrivalCityName[i] + '</td><td class="txt1" name="td4">'+ traivTime[i] +'</td><td class="txt4" name="td5">' + price[i] + '元</td><td class="txt4"><a href="#" >购票</a></td>';

        }
        else{
            tr.innerHTML = '<td class="txt1" name="td0">' + airlineName1[i] + craftTypeCode1[i] +'</td><td class="txt2"name="td1">' + departureDate[i] + '<br/>' + departureCityName[i] + '</td><td class="txt3" name="td2">直达<br/>——————————></td><td class="txt2" name="td3">' + arrivalDate[i] + '<br/>' + arrivalCityName[i] + '</td><td class="txt1" name="td4">'+ traivTime[i] +'</td><td class="txt4" name="td5">' + price[i] + '元</td><td class="txt4"><a href="#" >购票</a></td>';
        }
        tr.setAttribute('class', 'tr01');
        tr.setAttribute('name', 'my_data');
        tdArr.appendChild(tr);
    }
}

function deleteall() {
    var obj = document.getElementsByName("my_data");

    for(var i = 0;i<obj.length;){
//        obj[i].parentNode.removeChild(obj[i]);
        obj[0].remove();//remove为jQuery方法。
    }
}

function selectChange() {

    var key1 = document.getElementById("airlines").options[document.getElementById("airlines").selectedIndex].value;
    var key2 = document.getElementById("cabin").options[document.getElementById("cabin").selectedIndex].value;
    var key3 = document.getElementById("airlines").options[document.getElementById("airlines").selectedIndex].value;
    var key4 = document.getElementById("route").options[document.getElementById("route").selectedIndex].value;

    deleteall();

    if(key1 == "不限" && key2 == "不限" && key4 == "不限")
    {
        drawlist();
    }
    else if(key1 == "不限" && key2 == "不限")
    {
        tdArr = document.getElementById('tb1').firstElementChild;
        for (var i = 0; i < airlineName1.length ; i++) {
            if(flightflag[i]==key4)
            {
                var tr = document.createElement("tr");
                if(flightflag[i] == 1)
                {
                    tr.innerHTML = '<td class="txt1" name="td0">' + airlineName1[i] + craftTypeCode1[i] + '<br/>'+ airlineName2[i] + craftTypeCode2[i] +'</td><td class="txt2"name="td1">' + departureDate[i] + '<br/>' + departureCityName[i] + '</td><td class="txt3" name="td2">停留'+stayTIme[i]+'</br>——————————></br>转'+stayCityName[i]+'</td><td class="txt2" name="td3">' + arrivalDate[i] + '<br/>' + arrivalCityName[i] + '</td><td class="txt1" name="td4">'+ traivTime[i] +'</td><td class="txt4" name="td5">' + price[i] + '元</td><td class="txt4"><a href="#" >购票</a></td>';

                }
                else{
                    tr.innerHTML = '<td class="txt1" name="td0">' + airlineName1[i] + craftTypeCode1[i] +'</td><td class="txt2"name="td1">' + departureDate[i] + '<br/>' + departureCityName[i] + '</td><td class="txt3" name="td2">直达<br/>——————————></td><td class="txt2" name="td3">' + arrivalDate[i] + '<br/>' + arrivalCityName[i] + '</td><td class="txt1" name="td4">'+ traivTime[i] +'</td><td class="txt4" name="td5">' + price[i] + '元</td><td class="txt4"><a href="#" >购票</a></td>';
                }
                tr.setAttribute('class', 'tr01');
                tr.setAttribute('name', 'my_data');
                tdArr.appendChild(tr);
            }

        }
    }
    else if(key4 == "不限" && key2 == "不限")
    {
        tdArr = document.getElementById('tb1').firstElementChild;
        for (var i = 0; i < airlineName1.length ; i++) {
            if(airlineName1[i]==key1)
            {
                var tr = document.createElement("tr");
                if(flightflag[i] == 1)
                {
                    tr.innerHTML = '<td class="txt1" name="td0">' + airlineName1[i] + craftTypeCode1[i] + '<br/>'+ airlineName2[i] + craftTypeCode2[i] +'</td><td class="txt2"name="td1">' + departureDate[i] + '<br/>' + departureCityName[i] + '</td><td class="txt3" name="td2">停留'+stayTIme[i]+'</br>——————————></br>转'+stayCityName[i]+'</td><td class="txt2" name="td3">' + arrivalDate[i] + '<br/>' + arrivalCityName[i] + '</td><td class="txt1" name="td4">'+ traivTime[i] +'</td><td class="txt4" name="td5">' + price[i] + '元</td><td class="txt4"><a href="#" >购票</a></td>';

                }
                else{
                    tr.innerHTML = '<td class="txt1" name="td0">' + airlineName1[i] + craftTypeCode1[i] +'</td><td class="txt2"name="td1">' + departureDate[i] + '<br/>' + departureCityName[i] + '</td><td class="txt3" name="td2">直达<br/>——————————></td><td class="txt2" name="td3">' + arrivalDate[i] + '<br/>' + arrivalCityName[i] + '</td><td class="txt1" name="td4">'+ traivTime[i] +'</td><td class="txt4" name="td5">' + price[i] + '元</td><td class="txt4"><a href="#" >购票</a></td>';
                }
                tr.setAttribute('class', 'tr01');
                tr.setAttribute('name', 'my_data');
                tdArr.appendChild(tr);
            }

        }
    }
    else if(key1 == "不限" && key4 == "不限")
    {
        tdArr = document.getElementById('tb1').firstElementChild;
        for (var i = 0; i < airlineName1.length ; i++) {
            if(rank[i]==key2)
            {
                var tr = document.createElement("tr");
                if(flightflag[i] == 1)
                {
                    tr.innerHTML = '<td class="txt1" name="td0">' + airlineName1[i] + craftTypeCode1[i] + '<br/>'+ airlineName2[i] + craftTypeCode2[i] +'</td><td class="txt2"name="td1">' + departureDate[i] + '<br/>' + departureCityName[i] + '</td><td class="txt3" name="td2">停留'+stayTIme[i]+'</br>——————————></br>转'+stayCityName[i]+'</td><td class="txt2" name="td3">' + arrivalDate[i] + '<br/>' + arrivalCityName[i] + '</td><td class="txt1" name="td4">'+ traivTime[i] +'</td><td class="txt4" name="td5">' + price[i] + '元</td><td class="txt4"><a href="#" >购票</a></td>';

                }
                else{
                    tr.innerHTML = '<td class="txt1" name="td0">' + airlineName1[i] + craftTypeCode1[i] +'</td><td class="txt2"name="td1">' + departureDate[i] + '<br/>' + departureCityName[i] + '</td><td class="txt3" name="td2">直达<br/>——————————></td><td class="txt2" name="td3">' + arrivalDate[i] + '<br/>' + arrivalCityName[i] + '</td><td class="txt1" name="td4">'+ traivTime[i] +'</td><td class="txt4" name="td5">' + price[i] + '元</td><td class="txt4"><a href="#" >购票</a></td>';
                }
                tr.setAttribute('class', 'tr01');
                tr.setAttribute('name', 'my_data');
                tdArr.appendChild(tr);
            }

        }
    }
    else if(key1 == "不限")
    {
        tdArr = document.getElementById('tb1').firstElementChild;
        for (var i = 0; i < airlineName1.length ; i++) {
            if(flightflag[i]==key4 && rank[i]==key2)
            {
                var tr = document.createElement("tr");
                if(flightflag[i] == 1)
                {
                    tr.innerHTML = '<td class="txt1" name="td0">' + airlineName1[i] + craftTypeCode1[i] + '<br/>'+ airlineName2[i] + craftTypeCode2[i] +'</td><td class="txt2"name="td1">' + departureDate[i] + '<br/>' + departureCityName[i] + '</td><td class="txt3" name="td2">停留'+stayTIme[i]+'</br>——————————></br>转'+stayCityName[i]+'</td><td class="txt2" name="td3">' + arrivalDate[i] + '<br/>' + arrivalCityName[i] + '</td><td class="txt1" name="td4">'+ traivTime[i] +'</td><td class="txt4" name="td5">' + price[i] + '元</td><td class="txt4"><a href="#" >购票</a></td>';

                }
                else{
                    tr.innerHTML = '<td class="txt1" name="td0">' + airlineName1[i] + craftTypeCode1[i] +'</td><td class="txt2"name="td1">' + departureDate[i] + '<br/>' + departureCityName[i] + '</td><td class="txt3" name="td2">直达<br/>——————————></td><td class="txt2" name="td3">' + arrivalDate[i] + '<br/>' + arrivalCityName[i] + '</td><td class="txt1" name="td4">'+ traivTime[i] +'</td><td class="txt4" name="td5">' + price[i] + '元</td><td class="txt4"><a href="#" >购票</a></td>';
                }
                tr.setAttribute('class', 'tr01');
                tr.setAttribute('name', 'my_data');
                tdArr.appendChild(tr);
            }

        }
    }
    else if(key2 == "不限")
    {
        tdArr = document.getElementById('tb1').firstElementChild;
        for (var i = 0; i < airlineName1.length ; i++) {
            if(airlineName1[i]==key1 && flightflag[i]==key4)
            {
                var tr = document.createElement("tr");
                if(flightflag[i] == 1)
                {
                    tr.innerHTML = '<td class="txt1" name="td0">' + airlineName1[i] + craftTypeCode1[i] + '<br/>'+ airlineName2[i] + craftTypeCode2[i] +'</td><td class="txt2"name="td1">' + departureDate[i] + '<br/>' + departureCityName[i] + '</td><td class="txt3" name="td2">停留'+stayTIme[i]+'</br>——————————></br>转'+stayCityName[i]+'</td><td class="txt2" name="td3">' + arrivalDate[i] + '<br/>' + arrivalCityName[i] + '</td><td class="txt1" name="td4">'+ traivTime[i] +'</td><td class="txt4" name="td5">' + price[i] + '元</td><td class="txt4"><a href="#" >购票</a></td>';

                }
                else{
                    tr.innerHTML = '<td class="txt1" name="td0">' + airlineName1[i] + craftTypeCode1[i] +'</td><td class="txt2"name="td1">' + departureDate[i] + '<br/>' + departureCityName[i] + '</td><td class="txt3" name="td2">直达<br/>——————————></td><td class="txt2" name="td3">' + arrivalDate[i] + '<br/>' + arrivalCityName[i] + '</td><td class="txt1" name="td4">'+ traivTime[i] +'</td><td class="txt4" name="td5">' + price[i] + '元</td><td class="txt4"><a href="#" >购票</a></td>';
                }
                tr.setAttribute('class', 'tr01');
                tr.setAttribute('name', 'my_data');
                tdArr.appendChild(tr);
            }

        }
    }
    else if(key4 == "不限")
    {
        tdArr = document.getElementById('tb1').firstElementChild;
        for (var i = 0; i < airlineName1.length ; i++) {
            if(airlineName1[i]==key1 && rank[i]==key2)
            {
                var tr = document.createElement("tr");
                if(flightflag[i] == 1)
                {
                    tr.innerHTML = '<td class="txt1" name="td0">' + airlineName1[i] + craftTypeCode1[i] + '<br/>'+ airlineName2[i] + craftTypeCode2[i] +'</td><td class="txt2"name="td1">' + departureDate[i] + '<br/>' + departureCityName[i] + '</td><td class="txt3" name="td2">停留'+stayTIme[i]+'</br>——————————></br>转'+stayCityName[i]+'</td><td class="txt2" name="td3">' + arrivalDate[i] + '<br/>' + arrivalCityName[i] + '</td><td class="txt1" name="td4">'+ traivTime[i] +'</td><td class="txt4" name="td5">' + price[i] + '元</td><td class="txt4"><a href="#" >购票</a></td>';

                }
                else{
                    tr.innerHTML = '<td class="txt1" name="td0">' + airlineName1[i] + craftTypeCode1[i] +'</td><td class="txt2"name="td1">' + departureDate[i] + '<br/>' + departureCityName[i] + '</td><td class="txt3" name="td2">直达<br/>——————————></td><td class="txt2" name="td3">' + arrivalDate[i] + '<br/>' + arrivalCityName[i] + '</td><td class="txt1" name="td4">'+ traivTime[i] +'</td><td class="txt4" name="td5">' + price[i] + '元</td><td class="txt4"><a href="#" >购票</a></td>';
                }
                tr.setAttribute('class', 'tr01');
                tr.setAttribute('name', 'my_data');
                tdArr.appendChild(tr);
            }

        }
    }
    else
    {
        tdArr = document.getElementById('tb1').firstElementChild;
        for (var i = 0; i < airlineName1.length ; i++) {
            if(airlineName1[i]==key1 && rank[i]==key2 &&flightflag[i]==key4)
            {
                var tr = document.createElement("tr");
                if(flightflag[i] == 1)
                {
                    tr.innerHTML = '<td class="txt1" name="td0">' + airlineName1[i] + craftTypeCode1[i] + '<br/>'+ airlineName2[i] + craftTypeCode2[i] +'</td><td class="txt2"name="td1">' + departureDate[i] + '<br/>' + departureCityName[i] + '</td><td class="txt3" name="td2">停留'+stayTIme[i]+'</br>——————————></br>转'+stayCityName[i]+'</td><td class="txt2" name="td3">' + arrivalDate[i] + '<br/>' + arrivalCityName[i] + '</td><td class="txt1" name="td4">'+ traivTime[i] +'</td><td class="txt4" name="td5">' + price[i] + '元</td><td class="txt4"><a href="#" >购票</a></td>';

                }
                else{
                    tr.innerHTML = '<td class="txt1" name="td0">' + airlineName1[i] + craftTypeCode1[i] +'</td><td class="txt2"name="td1">' + departureDate[i] + '<br/>' + departureCityName[i] + '</td><td class="txt3" name="td2">直达<br/>——————————></td><td class="txt2" name="td3">' + arrivalDate[i] + '<br/>' + arrivalCityName[i] + '</td><td class="txt1" name="td4">'+ traivTime[i] +'</td><td class="txt4" name="td5">' + price[i] + '元</td><td class="txt4"><a href="#" >购票</a></td>';
                }
                tr.setAttribute('class', 'tr01');
                tr.setAttribute('name', 'my_data');
                tdArr.appendChild(tr);
            }

        }
    }
}


function sortNumberAS(a, b)//升序
{
    return a - b
}
function sortNumberDesc(a, b)//降序
{
    return b - a
}


var tag=1;
function SortTable(obj){
    var td0s=document.getElementsByName("td0");//得到id为td0的一串列表，下相同
    var td1s=document.getElementsByName("td1");
    var td2s=document.getElementsByName("td2");
    var td3s=document.getElementsByName("td3");
    var td4s=document.getElementsByName("td4");
    var td5s=document.getElementsByName("td5");
    var tdArray0=[];
    var tdArray1=[];
    var tdArray2=[];
    var tdArray3=[];
    var tdArray4=[];
    var tdArray5=[];
    for(var i=0;i<td0s.length;i++){
        tdArray0.push(td0s[i].innerHTML);
    }//每串都写到数组中
    for(var i=0;i<td1s.length;i++){
        tdArray1.push(td1s[i].innerHTML);
    }
    for(var i=0;i<td2s.length;i++){
        tdArray2.push(td2s[i].innerHTML);
    }
    for(var i=0;i<td3s.length;i++){
        tdArray3.push(td3s[i].innerHTML);
    }
    for(var i=0;i<td4s.length;i++){
        tdArray4.push(td4s[i].innerHTML);
    }
    for(var i=0;i<td5s.length;i++){
        tdArray5.push(td5s[i].innerHTML);
    }

    var tds = document.getElementsByName("td" + obj.id.substr(2, 1));
    //得到当前传入对象的那一列
    var columnArray=[];
    for(var i=0;i<tds.length;i++){
        columnArray.push(tds[i].innerHTML);
    }//当前那一列都写入column这个栈，是逆序的
    var orginArray=[];
    for(var i=0;i<columnArray.length;i++){
        orginArray.push(columnArray[i]);
    }//将这一列的内容再存储一遍，一会原来列表修改以后，
    //通过比对值的方式对应到当前行的内容，实现同行内容一起修改
    columnArray.sort();   //排序后的新值，只排序了当前列
    for(var i=0;i<columnArray.length;i++){
        for(var j=0;j<orginArray.length;j++){
            if(orginArray[j]==columnArray[i]){
                document.getElementsByName("td0")[i].innerHTML=tdArray0[j];
                document.getElementsByName("td1")[i].innerHTML=tdArray1[j];
                document.getElementsByName("td2")[i].innerHTML=tdArray2[j];
                document.getElementsByName("td3")[i].innerHTML=tdArray3[j];
                document.getElementsByName("td4")[i].innerHTML=tdArray4[j];
                document.getElementsByName("td5")[i].innerHTML=tdArray5[j];
                orginArray[j]=null;
                break;
            }
        }
    }
}

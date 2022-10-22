
var route1=[];
var route2=[];
var route3=[];
var routes=[];
var selectedList=[];
var sLists=[];
var select=1;
var total;
var tdArr;

var param=sessionStorage.getItem("param")

var deptFlag=0;
var arrFlag=0;
var durationFlag=0;
var priceFlag=0;


/*
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
*//*var city01 = sessionStorage.getItem('from_city');
var city02 = sessionStorage.getItem('to_city');
var date01 = sessionStorage.getItem('from_dt');
var date02 = sessionStorage.getItem('back_dt');*//*


// alert(datacp);
if(city01!=null && city02!=null && date01!=null) {



//此处只发送目的地和地址以显示月份价格预测数据

*//* 用XMLHTTPRequest来进行ajax异步数据交互*//*

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
    xmlhttp.open("POST", "uv/multiplySearch", true);

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
//    depdes["datetimepicker2"] = date02;

    var depdess = JSON.stringify(depdes)

    console.log(depdess)

    try {
        xmlhttp.send(depdess);
    } catch (e) {
        console(e.message())
    }*/
//* 用XMLHTTPRequest来进行ajax异步数据交互


//param = sessionStorage.getItem('param');
// var params = JSON.stringify(param);
//1.创建XMLHTTPRequest对象
    console.log(param)
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

    xmlhttp.open("POST", "uv/multiplySearch", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //xmlhttp.send();
    try {
            xmlhttp.send(param);
        } catch (e) {
            console(e.message())
        }

    xmlhttp.onreadystatechange = function (ev) {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            //var mydata = JSON.stringify(xmlhttp.responseText);

            var routes = JSON.parse(xmlhttp.responseText);


            console.log("routes:"+routes);
            total = routes.length;
            route1 = routes[0];
            route2 = routes[1];
            if(total == 3) {
                route3 = routes[2];
            }
            console.log("mydata:"+total);
            console.log("route1:"+route1[0].flightNo1);

            drawList();
            //alert(data[1].name+""+data[1].value);

        }
    }


window.onload = function () {

    drawList();

}

function reload() {
    //window.location.reload();
    select = 1;
    removeSelected();
    deleteall("my_data");
    deleteall("selected");
    drawList();

}

function removeSelected() {
    var length = selectedList.length;
    for(var i=0; i < length; i++) {
        selectedList.pop();
    }
}

function drawList() {
    tdArr = document.getElementById('display-flights').firstElementChild;
    deleteall("my_data");
    if(select == 1) {
    console.log("drawlist:"+route1.length);
        for (var i = 0; i < route1.length ; i++) {
            var tr = document.createElement("tr");

                tr.innerHTML =
                            '<td class="txt1" name="flightNo">' + route1[i].flightNo1 +"&nbsp;"+ route1[i].airlineName1 +
                            '</td><td class="txt2"name="td1">' + route1[i].departureTime + '<br/>' + route1[i].departureCityName + '&nbsp;'+route1[i].deptAirportName +
                            '</td><td class="txt3" name="td2">直达<br/>——————————></td><td class="txt2" name="td3">' + route1[i].arrivalTime + '<br/>' + route1[i].arrivalCityName + '&nbsp;'+route1[i].arrivalAirportName +
                            '</td><td class="txt1" name="td4">'+ route1[i].duration +
                            'min</td><td class="txt4" name="td5">￥' + route1[i].price +
                            '</td><td class="txt4"><button onclick="selectFlight('+i+')" class="btn btn-orange btn-winona btn-sm">选择该航程</a></td>';

            tr.setAttribute('class', 'tr01');
            tr.setAttribute('name', 'my_data');
            tdArr.appendChild(tr);
        }
        }
        else if(select == 2) {

            for (var i = 0; i < route2.length ; i++) {
                var tr = document.createElement("tr");

                    tr.innerHTML =
                                '<td class="txt1" name="flightNo">' + route2[i].flightNo1 +"&nbsp;"+ route2[i].airlineName1 +
                                '</td><td class="txt2"name="td1">' + route2[i].departureTime + '<br/>' + route2[i].departureCityName + '&nbsp;'+route2[i].deptAirportName +
                                '</td><td class="txt3" name="td2">直达<br/>——————————></td><td class="txt2" name="td3">' + route2[i].arrivalTime + '<br/>' + route2[i].arrivalCityName + '&nbsp;'+route2[i].arrivalAirportName +
                                '</td><td class="txt1" name="td4">'+ route2[i].duration +
                                'min</td><td class="txt4" name="td5">￥' + route2[i].price +
                                '</td><td class="txt4"><button onclick="selectFlight('+i+')" class="btn btn-orange btn-winona btn-sm">选择该航程</a></td>';

                tr.setAttribute('class', 'tr01');
                tr.setAttribute('name', 'my_data');
                tdArr.appendChild(tr);
            }
            }
            else if(select == 3 && total == 3) {
                for (var i = 0; i < route3.length ; i++) {
                    var tr = document.createElement("tr");

                        tr.innerHTML =
                        '<td class="txt1" name="flightNo">' + route3[i].flightNo1 +"&nbsp;"+ route3[i].airlineName1 +
                        '</td><td class="txt2"name="td1">' + route3[i].departureTime + '<br/>' + route3[i].departureCityName + '&nbsp;'+route3[i].deptAirportName +
                        '</td><td class="txt3" name="td2">直达<br/>——————————></td><td class="txt2" name="td3">' + route3[i].arrivalTime + '<br/>' + route3[i].arrivalCityName + '&nbsp;'+route3[i].arrivalAirportName +
                        '</td><td class="txt1" name="td4">'+ route3[i].duration +
                        'min</td><td class="txt4" name="td5">￥' + route3[i].price +
                        '</td><td class="txt4"><button onclick="selectFlight('+i+')" class="btn btn-orange btn-winona btn-sm">选择该航程</a></td>';

                    tr.setAttribute('class', 'tr01');
                    tr.setAttribute('name', 'my_data');
                    tdArr.appendChild(tr);
                }
                }
                else{}
}



function drawResult() {
tdArr = document.getElementById('selected').firstElementChild;
    console.log("drawResult:"+selectedList);
        var tr = document.createElement("tr");

          tr.innerHTML =
                        '<th class="th1">第&nbsp;' +select +'&nbsp;程&nbsp;'+ selectedList[0] +' -> '+selectedList[1]+
                        '</th><th class="th1">'+selectedList[2] + '&nbsp;'+ selectedList[3]+
                        '</th><th class="th1">'+selectedList[4]+'&nbsp;'+ selectedList[5]+
                        '</th><th class="th1">'+selectedList[6]+'&nbsp;'+ selectedList[7]+
                        '</th><th class="th5">￥'+selectedList[8]+
                        '</th><th><button onclick="reload()" class="btn btn-blue btn-winona">重新选择</button></th>';


        tr.setAttribute('class', 'tr01');
        tr.setAttribute('name', 'selected');
        tr.setAttribute('style', 'height:50px');
        tdArr.appendChild(tr);

}

function selectFlight(i) {
    removeSelected();

    if(select == 1) {
        selectedList.push(route1[i].departureCityName);
        selectedList.push(route1[i].arrivalCityName);
        selectedList.push(route1[i].airlineName1);
        selectedList.push(route1[i].flightNo1);
        selectedList.push(route1[i].departureTime);
        selectedList.push(route1[i].deptAirportName);
        selectedList.push(route1[i].arrivalTime);
        selectedList.push(route1[i].arrivalAirportName);
        selectedList.push(route1[i].price);
    }else if(select == 2) {
        selectedList.push(route2[i].departureCityName);
        selectedList.push(route2[i].arrivalCityName);
        selectedList.push(route2[i].airlineName1);
        selectedList.push(route2[i].flightNo1);
        selectedList.push(route2[i].departureTime);
        selectedList.push(route2[i].deptAirportName);
        selectedList.push(route2[i].arrivalTime);
        selectedList.push(route2[i].arrivalAirportName);
        selectedList.push(route2[i].price);
    }else if(select == 3 && total == 3) {
        selectedList.push(route3[i].departureCityName);
        selectedList.push(route3[i].arrivalCityName);
        selectedList.push(route3[i].airlineName1);
        selectedList.push(route3[i].flightNo1);
        selectedList.push(route3[i].departureTime);
        selectedList.push(route3[i].deptAirportName);
        selectedList.push(route3[i].arrivalTime);
        selectedList.push(route3[i].arrivalAirportName);
        selectedList.push(route3[i].price);
    }
    else{}

    sLists.push(selectedList);
    drawResult();
    console.log("selectedList:"+selectedList);
    select++;
    drawList(select);
}



function deleteall(s) {
    var obj = document.getElementsByName(s);

    for(var i = 0;i<obj.length;){
//        obj[i].parentNode.removeChild(obj[i]);
        obj[0].remove();//remove为jQuery方法。
    }
}

function sortDeptTime() {
if(deptFlag == 0) {
    if(select == 1) {
            route1.sort(function(a, b) {return a.departureTime < b.departureTime ? 1 : -1});
            drawList();
        }
        else if(select == 2) {
            route2.sort(function(a, b) {return a.departureTime < b.departureTime ? 1 : -1});
            drawList();
        }
        else if(select == 3) {
            route3.sort(function(a, b) {return a.departureTime < b.departureTime ? 1 : -1});
            drawList();
        }
        deptFlag = 1;
    }
    else if(deptFlag == 1) {
    if(select == 1) {
                route1.sort(function(a, b) {return b.departureTime < a.departureTime ? 1 : -1});
                drawList();
            }
            else if(select == 2) {
                route2.sort(function(a, b) {return b.departureTime < a.departureTime ? 1 : -1});
                drawList();
            }
            else if(select == 3) {
                route3.sort(function(a, b) {return b.departureTime < a.departureTime ? 1 : -1});
                drawList();
            }
            deptFlag = 0;
    }
}

function sortArrTime() {

if(arrFlag == 0) {
    if(select == 1) {
            route1.sort(function(a, b) {return a.arrivalTime < b.arrivalTime ? 1 : -1});
            drawList();
        }
        else if(select == 2) {
            route2.sort(function(a, b) {return a.arrivalTime < b.arrivalTime ? 1 : -1});
            drawList();
        }
        else if(select == 3) {
            route3.sort(function(a, b) {return a.arrivalTime < b.arrivalTime ? 1 : -1});
            drawList();
        }
        arrFlag = 1;
    }
    else if(arrFlag == 1) {
    if(select == 1) {
                route1.sort(function(a, b) {return b.arrivalTime < a.arrivalTime ? 1 : -1});
                drawList();
            }
            else if(select == 2) {
                route2.sort(function(a, b) {return b.arrivalTime < a.arrivalTime ? 1 : -1});
                drawList();
            }
            else if(select == 3) {
                route3.sort(function(a, b) {return b.arrivalTime < a.arrivalTime ? 1 : -1});
                drawList();
            }
            arrFlag = 0;
    }
}

function sortDuration() {
    if(durationFlag == 0) {
    if(select == 1) {
            route1.sort(function(a, b) {return a.duration - b.duration});
            drawList();
        }
        else if(select == 2) {
            route2.sort(function(a, b) {return a.duration - b.duration});
            drawList();
        }
        else if(select == 3) {
            route3.sort(function(a, b) {return a.duration - b.duration});
            drawList();
        }
        durationFlag = 1;
    }
    else if(durationFlag == 1) {
    if(select == 1) {
                route1.sort(function(a, b) {return b.duration - a.duration});
                drawList();
            }
            else if(select == 2) {
                route2.sort(function(a, b) {return b.duration - a.duration});
                drawList();
            }
            else if(select == 3) {
                route3.sort(function(a, b) {return b.duration - a.duration});
                drawList();
            }
            durationFlag = 0;
    }
}

function sortPrice() {

if(priceFlag == 0) {
    if(select == 1) {
            route1.sort(function(a, b) {return a.price - b.price});
            drawList();
        }
        else if(select == 2) {
            route2.sort(function(a, b) {return a.price - b.price});
            drawList();
        }
        else if(select == 3) {
            route3.sort(function(a, b) {return a.price - b.price});
            drawList();
        }
        priceFlag = 1;
    }
    else if(priceFlag == 1) {
    if(select == 1) {
                route1.sort(function(a, b) {return b.price - a.price});
                drawList();
            }
            else if(select == 2) {
                route2.sort(function(a, b) {return b.price - a.price});
                drawList();
            }
            else if(select == 3) {
                route3.sort(function(a, b) {return b.price - a.price});
                drawList();
            }
            priceFlag = 0;
    }
}
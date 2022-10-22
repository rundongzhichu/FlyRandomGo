function  register() {

    var username = $("#username").val()
    var password = $("#password").val()

    if(username==""||username==null||username ==undefined||password==""||password==null||password==undefined){
        alert("用户名或密码为空！")
        return;
    }

    var jsonObj = {"id":0,"username":username,"password":password};
    console.log(JSON.stringify(jsonObj))
    /*
        Jquery默认Content-Type为application/x-www-form-urlencoded类型
     */
    $.ajax({
        type: 'POST',
        url: "/user/register",
        dataType: "json",
        data: JSON.stringify(jsonObj),
        contentType : "application/json",
        success: function(data) {
            console.log(data)

            if(data["status"]==200){
                alert(data["error"])
                window.location.href="/login.html"
            }else{
                alert(data["error"])
            }

        },
        error: function(e) {
            console.log("fucking error")
        }
    });
}

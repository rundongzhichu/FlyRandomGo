package net.suncaper.flyrandomgo.controllors;

import com.google.gson.JsonObject;
import net.suncaper.flyrandomgo.Bean.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class RegisterController {
    @Autowired
    private JdbcTemplate jdbcTemplate;


    @PostMapping("/register")
    @ResponseBody
    public Map<String,String> register(@RequestBody UserInfo userInfo) {
        Map<String,String> re = new HashMap<>();
        try{
            String querysql="SELECT * FROM user WHERE username='"+userInfo.getUsername()+"';";
            System.out.println(querysql);
            List<Map<String,Object>> username = jdbcTemplate.queryForList(querysql);
            if(username.size() != 0) {
                System.out.println("用户名已存在");
                re.put("status","400");
                re.put("error","用户名已存在！");
            }
            else {
                String addsql = "INSERT INTO user (username,password) VALUES ('"+userInfo.getUsername()+"','"+userInfo.getPassword()+"');";
                System.out.println(addsql);
                jdbcTemplate.execute(addsql);
                re.put("status","200");
                re.put("error","注册成功！");
            }

            System.out.println("id:"+userInfo.getId());
            System.out.println("username:"+userInfo.getUsername());
            System.out.println("password:"+userInfo.getPassword());
        }catch(Exception e){
            re.put("status","400");
            re.put("error",e.getMessage());
        }
        return re;
    }

}

package net.suncaper.flyrandomgo.controllors;

import net.suncaper.flyrandomgo.Bean.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class LoginController {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @PostMapping(value = "login")
    public Map<String,String> login(@RequestBody  UserInfo userInfo){
        Map<String,String> re = new HashMap<>();
        re.put("status","200");
        re.put("error","登陆成功");
        try {
            System.out.println("testy");
            String getinfosql = "SELECT * FROM user WHERE username='"+userInfo.getUsername()+"' and password='"+userInfo.getPassword()+"';";
            System.out.println(getinfosql);

            List<Map<String,Object>> getinfo = jdbcTemplate.queryForList(getinfosql);
            if(getinfo.size() == 0) {
                System.out.println("用户名或密码错误");
                re.put("status","400");
                re.put("error","用户名或密码错误!");
            }
        }catch (Exception e) {
            System.out.println(e);
            re.put("status","400");
            re.put("error",e.getMessage());
        }
        return re;
    }

}

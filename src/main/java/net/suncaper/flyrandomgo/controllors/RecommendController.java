package net.suncaper.flyrandomgo.controllors;

import com.alibaba.fastjson.JSONObject;
import com.google.gson.JsonObject;
import net.suncaper.flyrandomgo.Bean.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/uv")
public class RecommendController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("recombyaccess")
    @ResponseBody
    //根据用户最近的一次访问记录推荐
    public Map<String, Object> recommendByAccess(@RequestBody JSONObject jsonObject) {
        Map<String,Object> re = new HashMap<>();
        try{
            //        String username = "admin";
            String username = jsonObject.getString("username");
            //获取该用户最近一次访问记录
            String sql1 = "SELECT deptCity, arrCity, deptDate\n" +
                    "FROM user join query on user.id = query.userid\n" +
                    "WHERE user.username = ?\n" +
                    "ORDER BY query.id desc\n" +
                    "limit 1;";
            RowMapper<Query> rowMapper = new BeanPropertyRowMapper<Query>(Query.class);
            Query query = jdbcTemplate.queryForObject(sql1, rowMapper,username);//最后一个参数为id值

            String newDeptCity = query.getDeptCity();
            String newArrCity = query.getArrCity();
            Date newDeptDate = query.getDeptDate();

            SimpleDateFormat df=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String preDate = df.format(new Date(newDeptDate.getTime() - (long)5 * 24 * 60 * 60 * 1000));
            String postDate = df.format(new Date(newDeptDate.getTime() + (long)10 * 24 * 60 * 60 * 1000));

            //找出邻近日期中价格最低的6天
            String sql2 = "SELECT deptCity, arrCity, deptDate, minPrice\n" +
                    "FROM (SELECT ? deptCity, ? arrCity, DATE(departureTime) deptDate, \n" +
                    "SUBSTRING_INDEX(GROUP_CONCAT(lowestPrice ORDER BY lowestPrice),',',1) minPrice\n" +
                    "FROM route\n" +
                    "WHERE departureCityName = ?\n" +
                    "and arrivalCityName = ?\n" +
                    "and unix_timestamp(departureTime) > unix_timestamp(?)\n" +
                    "and unix_timestamp(departureTime) < unix_timestamp(?)\n" +
                    "GROUP BY DATE(departureTime)\n" +
                    "ORDER BY minPrice\n" +
                    "limit 6) t\n" +
                    "ORDER BY deptDate;";
            Object[] params = new Object[] { newDeptCity, newArrCity, newDeptCity, newArrCity, preDate, postDate};
            List<Map<String, Object>> result = jdbcTemplate.queryForList(sql2, params);

            List<Map<String, String>> newResult=new ArrayList<>();
            for(Map<String, Object> map:result) {
                Map<String,String> newMap =new HashMap<String,String>();
                for (Map.Entry<String, Object> entry : map.entrySet()) {
                    if(entry.getValue() instanceof String){
                        newMap.put(entry.getKey(), (String) entry.getValue());
                    }
                    else {
                        SimpleDateFormat df2=new SimpleDateFormat("yyyy-MM-dd");
                        newMap.put(entry.getKey(), df2.format(entry.getValue()));
                    }
                }
                newResult.add(newMap);
            }
            re.put("status","200");
            re.put("error","已经进行用户航程推荐！");
            re.put("res",newResult);
        }catch (Exception e){
            re.put("status","400");
            re.put("error","用户航程推荐失败！");
        }

        return re;
    }


}

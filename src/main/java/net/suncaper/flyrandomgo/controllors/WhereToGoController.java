package net.suncaper.flyrandomgo.controllors;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/WhereToGo")
public class WhereToGoController {
    @RequestMapping(value = "/price",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    @ResponseBody
    public List<Map<String, Object>> flightSearch(@RequestBody JSONObject jsonObject) {



        String departure = jsonObject.getString("citySelect01");
        String departuretime = jsonObject.getString("datetimepicker1");

        System.out.println(departure+departuretime);

        String sql = "SELECT arrivalCityName,MIN(lowestPrice)AS lowestPrice FROM route WHERE departureCityName=\""+departure+"\" AND DATE(departureTime) = \""+departuretime+"\" GROUP BY arrivalCityName";

        System.out.println(sql);

        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql);

        System.out.println(results);

        return results;
    }



    @Autowired
    private JdbcTemplate jdbcTemplate;
    @GetMapping("flight")
    @ResponseBody
    public List<Map<String, Object>> listUvday() {
        String sql = "SELECT * FROM dws_uv_detail_days ORDER BY dt ASC";

        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql);

        return results;
    }
}


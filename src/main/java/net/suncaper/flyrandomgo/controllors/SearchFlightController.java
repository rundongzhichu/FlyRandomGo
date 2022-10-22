package net.suncaper.flyrandomgo.controllors;

import com.alibaba.fastjson.JSONObject;
import net.suncaper.flyrandomgo.Bean.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/flightsearch")
public class SearchFlightController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @RequestMapping(value = "/flight01",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    @ResponseBody
    public List<Map<String, Object>> flightSearch_1(@RequestBody JSONObject jsonObject) {

//            BufferedReader br = new BufferedReader(new InputStreamReader(req.getInputStream()));
//            StringBuffer sb=new StringBuffer();
//            String s=null;
//            while((s=br.readLine())!=null){
//                sb.append(s);
//            }
//            System.out.println("req = " + sb);

        String departure = jsonObject.getString("citySelect01");
        String destination = jsonObject.getString("citySelect02");
        String totime = jsonObject.getString("datetimepicker1");
        String backtime = jsonObject.getString("datetimepicker2");
        String username = jsonObject.getString("username");
        String cabin = jsonObject.getString("cabin");
        String adults = jsonObject.getString("adults");
        String children = jsonObject.getString("children");

        System.out.println(departure + destination + totime + backtime + cabin + adults + children);



        String sql = "SELECT * FROM combine " +
                "WHERE departureCityName = \""+departure+"\" AND " +
                "arrivalCityName = \""+destination+"\" AND " +
                "DATE(departureTime) = \""+totime+"\" " +
                "ORDER BY lowestPrice ASC";

        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql);

        System.out.println(results);

        return results;
    }

    @RequestMapping(value = "/flight02",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    @ResponseBody
    public List<Map<String, Object>> flightSearch_2(@RequestBody JSONObject jsonObject) {

//            BufferedReader br = new BufferedReader(new InputStreamReader(req.getInputStream()));
//            StringBuffer sb=new StringBuffer();
//            String s=null;
//            while((s=br.readLine())!=null){
//                sb.append(s);
//            }
//            System.out.println("req = " + sb);

        String departure = jsonObject.getString("citySelect01");
        String destination = jsonObject.getString("citySelect02");
        String totime = jsonObject.getString("datetimepicker1");
        String backtime = jsonObject.getString("datetimepicker2");
        String cabin = jsonObject.getString("cabin");
        String adults = jsonObject.getString("adults");
        String children = jsonObject.getString("children");

        System.out.println(departure + destination + totime + backtime + cabin + adults + children);



        String sql = "SELECT * FROM combine " +
                "WHERE departureCityName = \""+departure+"\" AND " +
                "arrivalCityName = \""+destination+"\" AND " +
                "DATE(departureTime) = \""+totime+"\" " +
                "ORDER BY lowestPrice ASC";

        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql);

        System.out.println(results);

        return results;
    }
/**

 @Autowired
 private JdbcTemplate jdbcTemplate;
 @GetMapping("flight")
 @ResponseBody
 public List<Map<String, Object>> listUvday() {
 String sql = "SELECT * FROM dws_uv_detail_days ORDER BY dt ASC";

 List<Map<String, Object>> results = jdbcTemplate.queryForList(sql);


 }
 */
}


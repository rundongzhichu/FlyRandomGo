package net.suncaper.flyrandomgo.controllors;

import com.alibaba.fastjson.JSONObject;
import org.apache.hadoop.yarn.webapp.hamlet.Hamlet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.ClientInfoStatus;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/flytimepredict")
public class WhenToFlyControllor {

    @Autowired
    private JdbcTemplate jdbctemp;

    @RequestMapping(value = "/monthprice",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Map<String,Double>> flyPriceMonthPredic(@RequestBody JSONObject jsonObject){

//            BufferedReader br = new BufferedReader(new InputStreamReader(req.getInputStream()));
//            StringBuffer sb=new StringBuffer();
//            String s=null;
//            while((s=br.readLine())!=null){
//                sb.append(s);
//            }
//            System.out.println("req = " + sb);

        String departure = jsonObject.getString("departure");
        String destination = jsonObject.getString("destination");

        String sql = "select departureTime,lowestPrice from route where arrivalCityName=\""+destination+"\" and departureCityName=\""+departure+"\" and airlineName!=\"myflight\" order by departureTime;";
        String backsql = "select departureTime,lowestPrice from route where arrivalCityName=\""+departure+"\" and departureCityName=\""+destination+"\" and airlineName!=\"myflight\" order by departureTime;";
        List<Map<String, Object>> results = jdbctemp.queryForList(sql);
        List<Map<String, Object>> backresults = jdbctemp.queryForList(backsql);

        Calendar calender = Calendar.getInstance();

        //存储返回结果的值,定义treeMap进行升序排序
        Map<String,Double> monthprice = new TreeMap<>((o1, o2) -> o1.compareTo(o2));
        Map<String,Double> godayprice = new TreeMap<>((o1, o2) -> o1.compareTo(o2));
        Map<String,Double> backdayprice = new TreeMap<>((o1, o2) -> o1.compareTo(o2));

        //得到去程每月最低价和每月对应每天最低价
        for(Map<String,Object> m:results){
            try{
                double price = new Double(String.valueOf(m.get("lowestPrice")));
                Date date = new SimpleDateFormat("yyyy-MM-dd").parse(String.valueOf(m.get("departureTime")));
                calender.setTime(date);
                int year = calender.get(Calendar.YEAR);
                int month = calender.get(Calendar.MONTH)+1;
                int day = calender.get(Calendar.DATE);
                String monthre = year+"-"+month;
                String dayre = year+"-"+month +"-"+ day;


                double monthpricepre =monthprice.getOrDefault(monthre,Double.MAX_VALUE);
                monthprice.put(monthre,price<monthpricepre?price:monthpricepre);


                double godaypricepre =godayprice.getOrDefault(dayre,Double.MAX_VALUE);
                godayprice.put(dayre,price<godaypricepre?price:godaypricepre);

//                System.out.println("monthre = " + monthre);
//                System.out.println("monthpricepre= " + monthpricepre);
//                System.out.println("daypre = " + dayre);
//                System.out.println("godaypricepre " + godaypricepre);
//                System.out.println("price= " + price);
//                System.out.println("\n");

            }catch (ParseException pe){
                System.out.println("日期字符串解析错误："+pe.getMessage());
            }

        }

        //得到返程最低价
        for(Map<String,Object> m:backresults){
            try{
                double price = new Double(String.valueOf(m.get("lowestPrice")));
                Date date = new SimpleDateFormat("yyyy-MM-dd").parse(String.valueOf(m.get("departureTime")));
                calender.setTime(date);
                int year = calender.get(Calendar.YEAR);
                int month = calender.get(Calendar.MONTH)+1;
                int day = calender.get(Calendar.DATE);
                String dayre = year+"-"+month +"-"+ day;

                double backdaypricepre =backdayprice.getOrDefault(dayre,Double.MAX_VALUE);
                backdayprice.put(dayre,price<backdaypricepre?price:backdaypricepre);

            }catch (ParseException pe){
                System.out.println("日期字符串解析错误："+pe.getMessage());
            }

        }

        Map<String,Map<String,Double>> res = new HashMap<>();


        res.put("monthprice",monthprice);
        res.put("godayprice",godayprice);
        res.put("backdayprice",backdayprice);


        System.out.println("resssf = " + results);
        System.out.println("resssf = " + backresults);
        System.out.println("res = " +res);
        System.out.println("departure:"+departure+" destination:"+destination);

        return res;
    }



}

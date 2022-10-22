package net.suncaper.flyrandomgo.controllors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.alibaba.fastjson.JSONObject;

import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping(value = "/uv")
public class MultiplySearchController {
    // 舱位：0 不限 1经济舱 2公务舱
    // 乘客类型：儿童 婴儿： 0（无） 1（有）

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void flightConcat(JSONObject jsonObject) {

//        String deptcity = "成都";
//        String arrcity = "上海";
//        String deptdate = "2020-6-26";
//        String username = "admin";
        String username = jsonObject.getString("username");
        String deptcity = jsonObject.getString("deptcity");
        String arrcity = jsonObject.getString("arrcity");
        String deptdate = jsonObject.getString("deptdate");

        //根据用户名查找用户id
        String sql_user = "SELECT id FROM user WHERE username = ?";
        Object[] param_user = new Object[] { username };
        int userid = jdbcTemplate.queryForObject(sql_user, param_user, Integer.class);
        System.out.println(String.format("username: %s userid: %d", username, userid));



//        String sql1 = String.format("SELECT IFNULL((SELECT 'Y' from query where deptCity = \"%s\" " +
//                                   "and arrCity = \"%s\" and deptDate = \"%s\" limit 1),'N');", deptcity, arrcity, deptdate);
        String sql1 = "SELECT IFNULL((SELECT 'Y' from query where deptCity = ? " +
                "and arrCity = ? and deptDate = ? limit 1),'N');";
        Object[] params = new Object[] { deptcity, arrcity, deptdate};
        String isQueried = jdbcTemplate.queryForObject(sql1, params, String.class);

        //插入该条查询记录
        String sql2 = "INSERT INTO query\n" +
                "SELECT null, ?, ?, ?, ?\n" +
                "WHERE NOT EXISTS(\n" +
                "SELECT *\n" +
                "FROM query\n" +
                "WHERE deptCity = ? and arrCity = ? and deptDate = ?);";
        jdbcTemplate.update(sql2, userid, deptcity, arrcity, deptdate, deptcity, arrcity, deptdate);
        System.out.println("Insert search record into query successfully.");

        //在查询记录中没有该条记录
        if(isQueried.equals("N")) {

            //清空拼接结果存储表
            String sql3 = "TRUNCATE comb_finf";
            jdbcTemplate.update(sql3);
            System.out.println("Empty table comb_finf successfully.");

            //获取route中当前的记录数
            String sql4 = "SELECT count(*) FROM route;";
            int route_num = jdbcTemplate.queryForObject(sql4, Integer.class);
            System.out.println(route_num);

            //存储完整拼接信息
            String sql5 = "INSERT INTO comb_finf\n" +
                    "SELECT @n:=@n+1 combine_id, combineRoute.*\n" +
                    "FROM\n" +
                    "(SELECT a.*, b.id b_id, b.flightNo b_flightNo, " +
                    "b.airlineCode b_airlineCode, b.airlineName b_airlineName, b.punctualityRate b_punctualityRate, " +
                    "b.arrivalCityName b_arrivalCityName, b.arrivalCityCode b_arrivalCityCode, b.arrivalAirportName b_arrivalAirportName, " +
                    "b.arrivalAirportCode b_arrivalAirportCode, b.arrivalTerminal b_arrivalTerminal, b.arrivalTime b_arrivalTime, " +
                    "b.departureCityName b_departureCityName, b.departureCityCode b_departureCityCode, b.deptAirportName b_deptAirportName, " +
                    "b.deptAirportCode b_deptAirportCode, b.departureTerminal b_departureTerminal, b.departureTime b_departureTime, " +
                    "b.duration b_duration, b.lowestBabyCfPrice b_lowestBabyCfPrice, b.lowestBabyPrice b_lowestBabyPrice, " +
                    "b.lowestCfPrice b_lowestCfPrice, b.lowestChildCfPrice b_lowestChildCfPrice, b.lowestChildPrice b_lowestChildPrice, " +
                    "b.lowestPrice b_lowestPrice, b.craftCode b_craftCode, b.craftKind b_craftKind, b.craftName b_craftName\n" +
                    "FROM route a join route b on a.arrivalAirportCode = b.deptAirportCode\n" +
                    "WHERE a.departureCityName = ? \n" +
                    "and b.arrivalCityName = ? \n" +
                    "and DATE(a.departureTime) = ?\n" +
                    "and a.flightNo is not null\n" +
                    "and b.flightNo is not null\n" +
                    "and CONVERT((UNIX_TIMESTAMP(b.departureTime) - UNIX_TIMESTAMP(a.arrivalTime))/60, SIGNED) between 0 and a.duration+b.duration" +
                    ") AS combineRoute, " +
                    "(SELECT @n:= ?) d " +
                    "ORDER BY combineRoute.lowestPrice+combineRoute.b_lowestPrice limit 15";
            jdbcTemplate.update(sql5, deptcity, arrcity, deptdate, route_num);
            System.out.println("Insert concat flight record into comb_finf successfully.");

            //将智能拼接结果插入到combine中
            String sql_com = "INSERT INTO combine \n" +
                    "SELECT null, 1, 1, flightNo, airlineName, punctualityRate, craftCode, craftKind, craftName, " +
                    "b_flightNo, b_airlineName, b_punctualityRate, b_craftCode, b_craftKind, b_craftName, " +
                    "departureCityName, departureCityCode, deptAirportName, deptAirportCode, departureTerminal, " +
                    "b_arrivalCityName, b_arrivalCityCode, b_arrivalAirportName, b_arrivalAirportCode, b_arrivalTerminal, " +
                    "arrivalCityName, arrivalCityCode, arrivalAirportName, arrivalAirportCode, departureTime, b_arrivalTime, " +
                    "CONVERT((UNIX_TIMESTAMP(b_departureTime) - UNIX_TIMESTAMP(arrivalTime))/60, SIGNED), " +
                    "null, null, null, null, null, lowestPrice+b_lowestPrice, " +
                    "CONVERT((UNIX_TIMESTAMP(b_arrivalTime) - UNIX_TIMESTAMP(departureTime))/60, SIGNED) \n" +
                    "FROM (SELECT a.*, b.id b_id, b.flightNo b_flightNo, b.airlineCode b_airlineCode, b.airlineName b_airlineName, " +
                    "b.punctualityRate b_punctualityRate, b.arrivalCityName b_arrivalCityName, b.arrivalCityCode b_arrivalCityCode, " +
                    "b.arrivalAirportName b_arrivalAirportName, b.arrivalAirportCode b_arrivalAirportCode, b.arrivalTerminal b_arrivalTerminal, " +
                    "b.arrivalTime b_arrivalTime, b.departureCityName b_departureCityName, b.departureCityCode b_departureCityCode, " +
                    "b.deptAirportName b_deptAirportName, b.deptAirportCode b_deptAirportCode, b.departureTerminal b_departureTerminal, " +
                    "b.departureTime b_departureTime, b.duration b_duration, b.lowestBabyCfPrice b_lowestBabyCfPrice, " +
                    "b.lowestBabyPrice b_lowestBabyPrice, b.lowestCfPrice b_lowestCfPrice, b.lowestChildCfPrice b_lowestChildCfPrice, " +
                    "b.lowestChildPrice b_lowestChildPrice, b.lowestPrice b_lowestPrice, b.craftCode b_craftCode, b.craftKind b_craftKind, " +
                    "b.craftName b_craftName\n" +
                    "FROM route a join route b on a.arrivalAirportCode = b.deptAirportCode\n" +
                    "WHERE a.departureCityName = ? \n" +
                    "and b.arrivalCityName = ? \n" +
                    "and DATE(a.departureTime) = ?\n" +
                    "and a.flightNo is not null\n" +
                    "and b.flightNo is not null\n" +
                    "and CONVERT((UNIX_TIMESTAMP(b.departureTime) - UNIX_TIMESTAMP(a.arrivalTime))/60, SIGNED) between 0 and a.duration+b.duration) joinRoute " +
                    "ORDER BY lowestPrice+b_lowestPrice limit 15";
            jdbcTemplate.update(sql_com, deptcity, arrcity, deptdate);
            System.out.println("Insert concat flight record into combine table successfully.");


            String sql_combnum = "SELECT count(*) FROM comb_finf;";
            Integer combnum = jdbcTemplate.queryForObject(sql_combnum, Integer.class);
            if(combnum.equals(0))
                System.out.println("There is no concat record found");
            else {
                System.out.println(String.format("Total concat flight number from %s to %s on %s: %d", deptcity, arrcity, deptdate, combnum));
                //自己的拼接方案在airlineName字段用myflight标识
                String sql6 = "INSERT INTO route\n" +
                        "SELECT combine_id, null, null, \"myflight\", null, \n" +
                        "b_arrivalCityName, b_arrivalCityCode, b_arrivalAirportName, b_arrivalAirportCode, b_arrivalTerminal, b_arrivalTime, \n" +
                        "departureCityName, departureCityCode, deptAirportName, deptAirportCode, departureTerminal, departureTime, \n" +
                        "CONVERT((UNIX_TIMESTAMP(b_arrivalTime) - UNIX_TIMESTAMP(departureTime))/60, SIGNED), \n" +
                        "null, null, null, null, null, lowestPrice+b_lowestPrice, null, null, null \n" +
                        "FROM comb_finf;";
                jdbcTemplate.update(sql6);
                System.out.println("Insert concat record into route successfully.");

                String sql7 = "INSERT INTO leg\n" +
                        "SELECT null, combine_id, flightNo, airlineCode, airlineName, punctualityRate, \n" +
                        "arrivalCityName, arrivalCityCode, arrivalAirportName, arrivalAirportCode, arrivalTerminal, arrivalTime, \n" +
                        "departureCityName, departureCityCode, deptAirportName, deptAirportCode, departureTerminal, departureTime, \n" +
                        "duration, craftCode, craftKind, craftName \n" +
                        "FROM comb_finf;";
                jdbcTemplate.update(sql7);
                System.out.println("Insert first concat leg record into leg successfully.");

                String sql8 = "INSERT INTO leg\n" +
                        "SELECT null, combine_id, b_flightNo, b_airlineCode, b_airlineName, b_punctualityRate, \n" +
                        "b_arrivalCityName, b_arrivalCityCode, b_arrivalAirportName, b_arrivalAirportCode, b_arrivalTerminal, b_arrivalTime, \n" +
                        "b_departureCityName, b_departureCityCode, b_deptAirportName, b_deptAirportCode, b_departureTerminal, b_departureTime, \n" +
                        "b_duration, b_craftCode, b_craftKind, b_craftName \n" +
                        "FROM comb_finf;";
                jdbcTemplate.update(sql8);
                System.out.println("Insert second concat leg record into leg successfully.");
            }
        }

//        System.out.println(isQueried);
//        return isQueried;
    }

    @RequestMapping(value = "/multiplySearch",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public List<List<Map<String, String>>> multiplySearch(@RequestBody JSONObject jsonObject) {

        //String test = "{\"multipass\":{\"0\":{\"username\":\"admin\",\"deptcity\":\"上海\",\"arrcity\":\"成都\",\"deptdate\":\"2020-6-25\"},\"1\":{\"username\":\"admin\",\"deptcity\":\"成都\",\"arrcity\":\"武汉\",\"deptdate\":\"2020-6-26\"}},\"conditions\":{\"baby\":0,\"child\":0,\"cabin\":0}}";
        //System.out.println(test);
        //JSONObject jsonObject =JSONObject.parseObject(test);
        System.out.println("json:"+jsonObject.toJSONString());
        String test = jsonObject.toJSONString();
        jsonObject =JSONObject.parseObject(test);
        JSONObject multipass = (JSONObject) jsonObject.get("multipass");
        JSONObject conditions = (JSONObject) jsonObject.get("conditions");

        int baby = Integer.parseInt(conditions.getString("baby"));
        int child = Integer.parseInt(conditions.getString("child"));
        int cabin = Integer.parseInt(conditions.getString("cabin"));

        String[] priceTag = {"lowestBabyPrice", "lowestBabyCfPrice", "lowestChildPrice",
                "lowestChildCfPrice", "lowestPrice", "lowestCfPrice"};
        List<String> priceTagSelected = new ArrayList<>();
        if(baby == 0 && child == 0 && cabin == 0) {priceTagSelected.add(priceTag[4]);}
        if(baby == 0 && child == 0 && cabin == 1) {priceTagSelected.add(priceTag[4]);}
        if(baby == 0 && child == 0 && cabin == 2) {priceTagSelected.add(priceTag[5]);}
        if(baby == 0 && child == 1 && cabin == 0) {priceTagSelected.add(priceTag[2]); priceTagSelected.add(priceTag[4]);}
        if(baby == 0 && child == 1 && cabin == 1) {priceTagSelected.add(priceTag[2]); priceTagSelected.add(priceTag[4]);}
        if(baby == 0 && child == 1 && cabin == 2) {priceTagSelected.add(priceTag[3]); priceTagSelected.add(priceTag[5]);}
        if(baby == 1 && child == 0 && cabin == 0) {priceTagSelected.add(priceTag[0]); priceTagSelected.add(priceTag[4]);}
        if(baby == 1 && child == 0 && cabin == 1) {priceTagSelected.add(priceTag[0]); priceTagSelected.add(priceTag[4]);}
        if(baby == 1 && child == 0 && cabin == 2) {priceTagSelected.add(priceTag[1]); priceTagSelected.add(priceTag[5]);}


        List<List<Map<String, String>>> results = new ArrayList<>();
        for(int i = 0; i < multipass.size(); i++){
            String key = String.valueOf(i);
            JSONObject query = (JSONObject) multipass.get(key);
            flightConcat(query);
            List<Map<String, String>> singleResult = singleSearchWithPrice(query, priceTagSelected);
            results.add(singleResult);
        }

        System.out.println("results:"+results);
        return results;
    }

    public List<Map<String, String>> singleSearchWithPrice(JSONObject query, List<String> pTag)
    {
        String deptcity = query.getString("deptcity");
        String arrcity = query.getString("arrcity");
        String deptdate = query.getString("deptdate");

        List<Map<String, String>> newResult = new ArrayList<>();
        if(pTag.size() == 1) {
            String p1 = pTag.get(0);

            String sql1 = "SELECT flightNo1,airlineName1,departureTime,departureCityName,\n" +
                    "deptAirportName,arrivalTime,arrivalCityName,\n" +
                    "arrivalAirportName,duration, " +
                    "lowestBabyPrice, lowestBabyCfPrice, lowestChildPrice, lowestChildCfPrice, lowestPrice, lowestCfPrice\n" +
                    "FROM combine\n" +
                    "WHERE joinFlag = 0\n" +
                    "and departureCityName = ? and arrivalCityName = ? and DATE(departureTime) = ?;";
            Object[] params = new Object[] {deptcity, arrcity, deptdate};
            List<Map<String, Object>> searchResult = jdbcTemplate.queryForList(sql1, params);


            for(Map<String, Object> map : searchResult) {
                if (!(map.get(p1) instanceof Integer))
                    continue;

                Map<String,String> newMap =new HashMap<>();
                for (Map.Entry<String, Object> entry : map.entrySet()) {

                    if(entry.getValue() instanceof String){
                        newMap.put(entry.getKey(), (String) entry.getValue());
                    }
                    else if(entry.getValue() instanceof Date) {
                        SimpleDateFormat df2=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                        newMap.put(entry.getKey(), df2.format(entry.getValue()));
                    }
                    //过滤掉key值不符的选项
                    else if (entry.getKey().equals("duration")) {
                        newMap.put(entry.getKey(), String.valueOf(entry.getValue()));
                    }
                    else if (entry.getKey().contains("lowest")){
                        if(entry.getKey().equals(p1)){
                            //System.out.println(String.format("%s : %d", entry.getKey(), entry.getValue()));
                            newMap.put("price", String.valueOf(entry.getValue()));
                        }else continue;
                    }
                }
                newResult.add(newMap);
            }

        }
        else if(pTag.size() == 2)
        {
            String p1 = pTag.get(0);
            String p2 = pTag.get(1);

            String sql2 = "SELECT flightNo1, airlineName1, departureTime, departureCityName, \n" +
                    "deptAirportName, arrivalTime, arrivalCityName, \n" +
                    "arrivalAirportName, duration, \n" +
                    "lowestBabyPrice, lowestBabyCfPrice, lowestChildPrice, lowestChildCfPrice, lowestPrice, lowestCfPrice\n" +
                    "FROM combine\n" +
                    "WHERE joinFlag = 0\n" +
                    "and departureCityName = ? and arrivalCityName = ? and DATE(departureTime) = ?;";

            Object[] param = new Object[] { deptcity, arrcity, deptdate};
            List<Map<String, Object>> searchResult = jdbcTemplate.queryForList(sql2, param);

            for(Map<String, Object> map : searchResult) {
                if (!(map.get(p1) instanceof Integer) || !(map.get(p2) instanceof Integer))
                    continue;
                Map<String,String> newMap =new HashMap<>();
                int price = 0;
                int num = 0;
                for (Map.Entry<String, Object> entry : map.entrySet()) {
                    if(entry.getValue() instanceof String){
                        newMap.put(entry.getKey(), (String) entry.getValue());
                    }
                    else if(entry.getValue() instanceof Date) {
                        SimpleDateFormat df2=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                        newMap.put(entry.getKey(), df2.format(entry.getValue()));
                    }
                    //过滤掉key值不符的选项
                    else if (entry.getKey().equals("duration")) {
                        newMap.put(entry.getKey(), String.valueOf(entry.getValue()));
                    }
                    else if (entry.getKey().contains("lowest")){
                        if(entry.getKey().equals(p1)){
                            num++;
                            price += (int)entry.getValue();
                            if(num == 2)
                            {
                                newMap.put("price", String.valueOf(price));
                                num = 0;
                                price = 0;
                            }
                            //System.out.println(String.format("%s : %d", entry.getKey(), entry.getValue()));
                        }else if(entry.getKey().equals(p2)) {
                            num++;
                            price += (int)entry.getValue();
                            if(num == 2)
                            {
                                newMap.put("price", String.valueOf(price));
                                num = 0;
                                price = 0;
                            }
                            //System.out.println(String.format("%s : %d", entry.getKey(), entry.getValue()));
                        }else continue;
                    }
                }
                newResult.add(newMap);
            }
        }
        return newResult;
    }
}

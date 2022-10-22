package net.suncaper.flyrandomgo.controllors;

import net.suncaper.flyrandomgo.Bean.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Controller
@RequestMapping(value = "/uv",produces = "application/json;charset=utf-8")
public class SearchController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("province")
    @ResponseBody
    public List<Map<String, String>> listSearch() {

        int trips01 = 1;
        String city1 = "杭州";
        String city2 = "西宁";
        String fromdt = "2020-06-17";
        String backdt = "2020-06-18";
        String sql_leg;
        String sql_route = "";

        //根据出发城市、到达城市、时间等从Route表中查询
        if (trips01 == 1) {//单程

            sql_route = "SELECT * FROM route WHERE " +
                    "departureCityName='" + city1 +
                    "' AND arrivalCityName='" + city2 +
                    "' AND DATE(departureTime)='" + fromdt +
                    "';";
        } else if (trips01 == 2) {//往返

            sql_route = "SELECT * FROM route WHERE " +
                    "(departureCityName='" + city1 +
                    "' AND arrivalCityName='" + city2 +
                    "') OR (departureCityName='" + city2 +
                    "' AND arrivalCityName='" + city1 +
                    "') AND DATE(departureTime)='" + fromdt +
                    "' AND DATE(arrivalTime)='" + backdt + "';";
        }


        //从route表中查询，并将结果保存在routes里
        List<Route> routes = jdbcTemplate.query(sql_route, new RouteMapper());
        System.out.println(sql_route);

        //获取转机的航程，将id保存至transit_id中
        ArrayList<Integer> transit_id = new ArrayList<>();
        Iterator<Route> i = routes.iterator();
        while (i.hasNext()){
            Route r = i.next();
            if(r.getFlightNo() == null) {
                transit_id.add(r.getId());
            }
        }


        //根据transit_id，从leg表里查询每个Route id所对应的航程，并将航程添加进那个Route中
        for (int j=0; j<transit_id.size(); j++) {
            sql_leg = "SELECT * FROM leg WHERE " +
                    "record_id='" + transit_id.get(j) +
                    "';";
            List<Leg> legs = jdbcTemplate.query(sql_leg, new LegMapper());
            for (int k=0;k<routes.size();k++) {
                if(routes.get(k).getId() == transit_id.get(j)) {
                    routes.get(k).setLegs(legs);
                }
            }
        }

        //将Route转换为Return
        List<Map<String,String>> results = new ArrayList<>();
        List<Return> rets = new ArrayList<>();

        Iterator<Route> iterator = routes.iterator();
        while (iterator.hasNext()){
            Return ret = new Return(iterator.next());
            Map<String,String> result = ret.ReturnToMap();
            results.add(result);
        }

        System.out.println(results.size() + " rows in set");
        return results;

    }
}

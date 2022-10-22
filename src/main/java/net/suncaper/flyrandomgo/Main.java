//package net.suncaper.flyrandomgo;
//
//import com.google.protobuf.TextFormat;
//import net.suncaper.flyrandomgo.Bean.Leg;
//import net.suncaper.flyrandomgo.Bean.Route;
//import net.suncaper.flyrandomgo.controllors.SortedRoutes;
//import org.apache.spark.api.java.JavaSparkContext;
//import org.codehaus.jackson.map.ObjectMapper;
//
//import java.io.IOException;
//import java.text.SimpleDateFormat;
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.Date;
//import java.util.List;
//
//public class Main {
//    public static void main(String[] args) throws TextFormat.ParseException,IOException {
//        //new JavaSparkContext();
//        SortedRoutes r1 = new SortedRoutes();
//        List<Route> r = new ArrayList<>();
//        List<Leg> l = new ArrayList<>();
//        l.add(new Leg(1,181,"EU2214","EU","成都航空",80,
//                "成都","CTU","双流国际机场","","T2","2020-06-16 01:00:00",
//                "兴义","ACX","兴义机场","ACX","","2020-06-15 23:30:00",
//                0,
//                "320","中型","空客320"));
//        l.add(new Leg(1,181,"CA4589","CA","中国国航",93,
//                "常州","CZX","奔牛机场","ACX","T1","2020-06-16 09:10:00",
//                "成都","","双流国际机场","","","2020-06-16 07:00:00",
//                0,
//                "321","中型","空客321"));
//
//
//
//        r.add(new Route(181,null,null,null,70,
//                "常州","ACX","奔牛机场","ACX","T1","2020-06-16 09:10:00",
//                "兴义","","兴义机场","","","2020-06-15 23:30:00",
//                0,
//                0,0,2500,0,0,990,
//                null,null,null,
//                null));
//
//        r.add(new Route(182,"MF5123","MF","四川航空",60,
//                "兴义","ACX","兴义机场","ACX","T1","2020-06-15 21:05:00",
//                "广州","","白云国际机场","","","2020-06-15 22:40:00",
//                0,
//                0,0,0,0,0,860,
//                "31G","小型","庞巴迪900",
//                null));
//
//        r.add(new Route(183,"MF5123","MF","厦门航空",0,
//                "兴义","ACX","兴义机场","ACX","T1","2020-06-15 22:05:00",
//                "广州","","白云国际机场","","","2020-06-15 21:40:00",
//                0,
//                0,0,1500,0,0,960,
//                "31G","中型","空客320",
//                l));
//
//        r1.setRoutes(r);
//        List<Route> r2 = r1.getRoutes();
//        System.out.println(r2.get(0).getId());
//        System.out.println(r2.get(1).getId());
//        System.out.println(r2.get(2).getId());
//        //r1.durationSorting(1);
//        //r1.priceSorting(0);
//        //r1.isTransit();
//        //r1.craftName("空客319");
//        //r1.airlineName("厦门航空");
//        //r1.departureTime(1);
//        //r1.arrivalTime(0);
//        r1.punctualitySorting(0);
//        List<Route> r3 = r1.getRoutes();
//        for(int i = 0;i <r3.size();i++) {
//            System.out.println(r3.get(i).getId());
//            //System.out.println(r3.get(i).getPunctualityRate());
//        }
//
//        /*ObjectMapper mapper = new ObjectMapper();
//        String json = mapper.writeValueAsString(l);
//        System.out.println(json);
//        //System.out.println(r1.toString());*/
//
//    }
//}

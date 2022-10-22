package net.suncaper.flyrandomgo.controllors;


import net.suncaper.flyrandomgo.Bean.Leg;
import net.suncaper.flyrandomgo.Bean.Route;

import java.text.SimpleDateFormat;
import java.util.*;

public class SortedRoutes {

    private List<Route> routes; //储存查询结果列表
    private List<String> names; //所有出现过的航空公司名列表

    public List<Route> getRoutes() {
        return routes;
    }

    public void setRoutes(List<Route> routes) {
        this.routes = routes;
    }

    //返回该航线查询结果中所有出现了的航空公司名
    public List<String> getAirlineName() {
        Iterator<Route> i = routes.iterator();
        while (i.hasNext()) {
            names.add(i.next().getAirlineName());
        }
        return names;
    }

    //返回该航线查询结果中所有出现了的机型名
    public List<String> getCraftName() {
        Iterator<Route> i = routes.iterator();
        while (i.hasNext()) {
            names.add(i.next().getCraftName());
        }
        return names;
    }


    //智能推荐，对多条航班信息进行比较并排序，
    //考虑因素包括总飞行时间，价格，准点率，中转次数，航班机型，起降时间。
    //无返回值，直接修改本类中的routes

    //根据飞行时间排序
    //asc = 0：由短到长 asc = 1：由长到短
    public void durationSorting(int asc){
        routes.sort((r1,r2) -> {
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            long t1 = 0, t2 = 0;
            try {
                t1 = df.parse(r1.getArrivalTime()).getTime() - df.parse(r1.getDepartureTime()).getTime();
                t2 = df.parse(r2.getArrivalTime()).getTime() - df.parse(r2.getDepartureTime()).getTime();
            }catch (Exception e) {
                System.out.println(e.toString());
            }

            if(asc == 1) {
                if(t1 < t2)
                    return 1;
                else if (t1 > t2)
                    return -1;
                else
                    return 0;
            }
            else{
                if(t1 < t2)
                    return -1;
                else if (t1 > t2)
                    return 1;
                else
                    return 0;
            }
        });
    }

    //根据经济舱价格排序
    //asc = 0：由低到高 asc = 1：由高到低
    public void priceSorting(int asc){
        routes.sort((r1, r2) ->{
            int p1 = r1.getLowestPrice();
            int p2 = r2.getLowestPrice();

            if(asc == 0) {
                if(p1 > p2)
                    return 1;
                else if (p1 < p2)
                    return -1;
                else
                    return 0;
            }
            else{
                if(p1 > p2)
                    return -1;
                else if (p1 < p2)
                    return 1;
                else
                    return 0;
            }
        });
    }

    /*//根据公务舱价格排序
    //asc = 0：由低到高 asc = 1：由高到低
    public void cfPriceSorting(int asc){
        Iterator<Route> i = routes.iterator();
        while (i.hasNext()) {
            Route r = i.next();
            if(r.getLowestCfPrice() == null) {
                i.remove();
            }
        }
        routes.sort((r1, r2) ->{
            int p1 = r1.getLowestCfPrice();
            int p2 = r2.getLowestCfPrice();

            if(asc == 0) {
                if(p1 > p2)
                    return 1;
                else if (p1 < p2)
                    return -1;
                else
                    return 0;
            }
            else{
                if(p1 > p2)
                    return -1;
                else if (p1 < p2)
                    return 1;
                else
                    return 0;
            }
        });
    }*/

    //根据准点率排序
    //asc = 0：由低到高 asc = 1：由高到低
    public void punctualitySorting(int asc){
        routes.sort((r1, r2) ->{
            double p1 = r1.getPunctualityRate();
            System.out.println(p1);
            double p2 = r2.getPunctualityRate();

            if(asc == 0) {
                if(p1 > p2)
                    return 1;
                else if (p1 < p2)
                    return -1;
                else
                    return 0;
            }
            else{
                if(p1 > p2)
                    return -1;
                else if (p1 < p2)
                    return 1;
                else
                    return 0;
            }
        });
    }

    //判断是否为直飞，并去除转机
    public void isTransit(){
        Iterator<Route> i = routes.iterator();
        while (i.hasNext()) {
            Route r = i.next();
            if(r.getFlightNo() == null) {
                i.remove();
            }
        }
    }

    //根据飞机机型筛选，去除不含指定机型的航线
    //参数 type：机型名 e.g. "空客319"
    public void craftName(String name){
        Iterator<Route> i = routes.iterator();
        while (i.hasNext()) {
            Route r = i.next();
            if(r.getCraftName() == null) {
                int flag = 0;
                Iterator<Leg> iL = r.getLegs().iterator();
                while (iL.hasNext()) {
                    Leg l = iL.next();
                    if(l.getCraftName() == name) {
                        flag = 1;
                    }
                    if(flag == 0)
                        i.remove();
                }
            }
            else {
                if(r.getCraftName() != name)
                    i.remove();
            }
        }
    }

    //根据飞机机型筛选，去除不含指定机型的航线
    //参数 type：飞机型号 e.g. "中型"
    public void craftKind(String kind){
        Iterator<Route> i = routes.iterator();
        while (i.hasNext()) {
            Route r = i.next();
            if(r.getCraftKind() == null) {
                int flag = 0;
                Iterator<Leg> iL = r.getLegs().iterator();
                while (iL.hasNext()) {
                    Leg l = iL.next();
                    if(l.getCraftKind() == kind) {
                        flag = 1;
                    }
                    if(flag == 0)
                        i.remove();
                }
            }
            else {
                if(r.getCraftKind() != kind)
                    i.remove();
            }
        }
    }

    //根据飞机机型筛选，去除不含指定机型的航线
    //参数 type：机型代码 e.g. "319"
    public void craftCode(String code){
        Iterator<Route> i = routes.iterator();
        while (i.hasNext()) {
            Route r = i.next();
            if(r.getCraftCode() == null) {
                int flag = 0;
                Iterator<Leg> iL = r.getLegs().iterator();
                while (iL.hasNext()) {
                    Leg l = iL.next();
                    if(l.getCraftCode() == code) {
                        flag = 1;
                    }
                    if(flag == 0)
                        i.remove();
                }
            }
            else {
                if(r.getCraftCode() != code)
                    i.remove();
            }
        }
    }

    //根据航空公司筛选，去除不含指定航空公司的航线
    //参数 name：航空公司名 e.g. "南方航空"
    public void airlineName(String name){
        Iterator<Route> i = routes.iterator();
        while (i.hasNext()) {
            Route r = i.next();
            if(r.getAirlineName() == null) {
                int flag = 0;
                List<Leg> l = new ArrayList<>();
                Iterator<Leg> iL = l.iterator();
                while (iL.hasNext()) {
                    Leg l1 = iL.next();
                    if(l1.getAirlineName() == name) {
                        flag = 1;
                    }
                    if(flag == 0)
                        i.remove();
                }
            } else {
                if(r.getAirlineName() != name)
                    i.remove();
            }
        }
    }

    //根据起飞时间排序
    //asc = 0：由早到晚 asc = 1：由晚到早
    public void departureTime(int asc){
        routes.sort((r1,r2) -> {
            SimpleDateFormat df = new SimpleDateFormat("HH:mm:ss");
            Date t1 = new Date();
            Date t2 = new Date();
            try {
                t1 = df.parse(r1.getDepartureTime().substring(11, 19));
                t2 = df.parse(r2.getDepartureTime().substring(11, 19));
            }catch (Exception e){
                System.out.println(e.toString());
            }

            if(asc == 0)
                return t1.compareTo(t2);
            else if(asc == 1)
                return t2.compareTo(t1);
            else
                return 0;
        });


    }

    //根据降落时间排序
    //asc = 0：由早到晚 asc = 1：由晚到早
    public void arrivalTime(int asc){
        routes.sort((r1,r2) -> {
            SimpleDateFormat df = new SimpleDateFormat("HH:mm:ss");
            Date t1 = new Date();
            Date t2 = new Date();
            try {
                t1 = df.parse(r1.getArrivalTime().substring(11, 19));
                t2 = df.parse(r2.getArrivalTime().substring(11, 19));
            }catch (Exception e){
                System.out.println(e.toString());
            }

            if(asc == 0)
                return t1.compareTo(t2);
            else if(asc == 1)
                return t2.compareTo(t1);
            else
                return 0;
        });
    }



}

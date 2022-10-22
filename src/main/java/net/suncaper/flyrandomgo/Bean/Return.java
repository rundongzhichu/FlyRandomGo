package net.suncaper.flyrandomgo.Bean;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

public class Return {

    //private int flag;
    private String flightNo1;          //航班号1
    private String flightNo2;          //若有转机为航班号2；若直飞为null
    private String deptAirportName;    //出发机场
    private String arrivalAirportName; //到达机场
    private String transit;            //中转机场
    private String departureTime;      //起飞时间
    private String arrivalTime;        //降落时间
    private int stayTime;              //停留时间(min)
    private int duration;              //总时长
    private int price;                 //票价

    public Return() { }

    public Return(Route route){

        if(route.getFlightNo() != null) {//直飞
            //this.flag = 1;
            this.stayTime = 0;
            this.flightNo1 = route.getFlightNo();
            this.departureTime = route.getDepartureTime();
            this.deptAirportName = route.getDeptAirportName();
            this.arrivalAirportName = route.getArrivalAirportName();
            this.arrivalTime = route.getArrivalTime();
            this.duration = route.getDuration();
            this.price = route.getLowestPrice();
        }
        else { //转机
            //this.flag = 2;
            this.transit = route.getLegs().get(1).getDeptAirportName();
            this.flightNo1 = route.getLegs().get(0).getFlightNo();
            this.flightNo2= route.getLegs().get(1).getFlightNo();
            this.deptAirportName = route.getLegs().get(0).getDeptAirportName();
            this.departureTime = route.getLegs().get(0).getDepartureTime();
            this.arrivalAirportName = route.getLegs().get(1).getArrivalAirportName();
            this.arrivalTime = route.getLegs().get(1).getArrivalTime();
            this.transit = route.getLegs().get(1).getDeptAirportName();
            this.duration = route.getDuration();
            this.price = route.getLowestPrice();
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            long t = 0;
            try {
                t = df.parse(route.getLegs().get(1).getDepartureTime()).getTime()
                        - df.parse(route.getLegs().get(0).getArrivalTime()).getTime();
            }catch (Exception e){
                System.out.println(e.toString());
            }
            this.stayTime = (int)(t / (1000*60));
        }

    }

   /* public int getFlag() {
        return flag;
    }

    public void setFlag(int flag) {
        this.flag = flag;
    }*/

    public String getFlightNo1() {
        return flightNo1;
    }

    public void setFlightNo1(String flightNo1) {
        this.flightNo1 = flightNo1;
    }

    public String getFlightNo2() {
        return flightNo2;
    }

    public void setFlightNo2(String flightNo2) {
        this.flightNo2 = flightNo2;
    }

    public String getDeptAirportName() {
        return deptAirportName;
    }

    public void setDeptAirportName(String deptAirportName) {
        this.deptAirportName = deptAirportName;
    }

    public String getArrivalAirportName() {
        return arrivalAirportName;
    }

    public void setArrivalAirportName(String arrivalAirportName) {
        this.arrivalAirportName = arrivalAirportName;
    }

    public String getTransit() {
        return transit;
    }

    public void setTransit(String transit) {
        this.transit = transit;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public int getStayTime() {
        return stayTime;
    }

    public void setStayTime(int stayTime) {
        this.stayTime = stayTime;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public Map<String, String> ReturnToMap() {
        Map<String,String> map =  new HashMap<>();
        map.put("flightNo1", flightNo1);
        map.put("flightNo2", flightNo2);
        map.put("deptAirportName", deptAirportName);
        map.put("arrivalAirportName", arrivalAirportName);
        map.put("transit", transit);
        map.put("departureTime", departureTime);
        map.put("arrivalTime", arrivalTime);
        map.put("stayTime", String.valueOf(stayTime));
        map.put("duration", String.valueOf(duration));
        map.put("price", String.valueOf(price));
        return map;
    }
}

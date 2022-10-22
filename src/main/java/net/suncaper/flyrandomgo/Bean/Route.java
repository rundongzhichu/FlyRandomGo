package net.suncaper.flyrandomgo.Bean;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class Route {

    private int id;
    private String flightNo;
    private String airlineCode;
    private String airlineName;
    private double punctualityRate;

    private String arrivalCityName;
    private String arrivalCityCode;
    private String arrivalAirportName;
    private String arrivalAirportCode;
    private String arrivalTerminal;
    private String arrivalTime;

    private String departureCityName;
    private String departureCityCode;
    private String deptAirportName;
    private String deptAirportCode;
    private String departureTerminal;
    private String departureTime;

    private int duration;

    private int lowestBabyCfPrice;
    private int lowestChildCfPrice;
    private int lowestCfPrice;
    private int lowestBabyPrice;
    private int lowestChildPrice;
    private int lowestPrice;

    private String craftCode;
    private String craftKind;
    private String craftName;

    private List<Leg> legs;

    public Route(){}

    public Route(int id, String flightNo, String airlineCode, String airlineName, double punctualityRate, String arrivalCityName, String arrivalCityCode, String arrivalAirportName, String arrivalAirportCode, String arrivalTerminal, String arrivalTime, String departureCityName, String departureCityCode, String deptAirportName, String deptAirportCode, String departureTerminal, String departureTime, int duration, int lowestBabyCfPrice, int lowestChildCfPrice, int lowestCfPrice, int lowestBabyPrice, int lowestChildPrice, int lowestPrice, String craftCode, String craftKind, String craftName, List<Leg> legs) {
        this.id = id;
        this.flightNo = flightNo;
        this.airlineCode = airlineCode;
        this.airlineName = airlineName;
        this.punctualityRate = punctualityRate;
        this.arrivalCityName = arrivalCityName;
        this.arrivalCityCode = arrivalCityCode;
        this.arrivalAirportName = arrivalAirportName;
        this.arrivalAirportCode = arrivalAirportCode;
        this.arrivalTerminal = arrivalTerminal;
        this.arrivalTime = arrivalTime;
        this.departureCityName = departureCityName;
        this.departureCityCode = departureCityCode;
        this.deptAirportName = deptAirportName;
        this.deptAirportCode = deptAirportCode;
        this.departureTerminal = departureTerminal;
        this.departureTime = departureTime;
        this.duration = duration;
        this.lowestBabyCfPrice = lowestBabyCfPrice;
        this.lowestChildCfPrice = lowestChildCfPrice;
        this.lowestCfPrice = lowestCfPrice;
        this.lowestBabyPrice = lowestBabyPrice;
        this.lowestChildPrice = lowestChildPrice;
        this.lowestPrice = lowestPrice;
        this.craftCode = craftCode;
        this.craftKind = craftKind;
        this.craftName = craftName;
        this.legs = legs;
    }

    public int getId() {
        return id;
    }

    public String getFlightNo() {
        return flightNo;
    }

    public String getAirlineCode() {
        return airlineCode;
    }

    public String getAirlineName() {
        return airlineName;
    }

    public double getPunctualityRate() {

        if(punctualityRate == 0) {
            List<Leg> ls = new ArrayList<>();
            Iterator<Leg> l = ls.iterator();
            double rate = 1.0;
            while (l.hasNext()){
                rate *= ((l.next().getPunctualityRate()) * 0.01);
            }
            return rate * 100;
        }
        else
            return punctualityRate;
    }



    public String getDepartureCityName() {
        return departureCityName;
    }

    public String getDepartureCityCode() {
        return departureCityCode;
    }

    public String getDeptAirportName() {
        return deptAirportName;
    }

    public String getDeptAirportCode() {
        return deptAirportCode;
    }

    public String getDepartureTerminal() {
        return departureTerminal;
    }

    public String getDepartureTime() {
        return departureTime;
    }



    public String getArrivalCityName() {
        return arrivalCityName;
    }

    public String getArrivalCityCode() {
        return arrivalCityCode;
    }

    public String getArrivalAirportName() {
        return arrivalAirportName;
    }

    public String getArrivalAirportCode() {
        return arrivalAirportCode;
    }

    public String getArrivalTerminal() {
        return arrivalTerminal;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }



    public int getDuration() {
        return duration;
    }



    public int getLowestBabyCfPrice() {
        return lowestBabyCfPrice;
    }

    public int getLowestChildCfPrice() {
        return lowestChildCfPrice;
    }

    public int getLowestCfPrice() {
        return lowestCfPrice;
    }

    public int getLowestBabyPrice() {
        return lowestBabyPrice;
    }

    public int getLowestChildPrice() {
        return lowestChildPrice;
    }

    public int getLowestPrice() {
        return lowestPrice;
    }



    public String getCraftCode() {
        return craftCode;
    }

    public String getCraftKind() {
        return craftKind;
    }

    public String getCraftName() {
        return craftName;
    }

    public List<Leg> getLegs() {
        return legs;
    }











    public void setId(int id) {
        this.id = id;
    }

    public void setFlightNo(String flightNo) {
        this.flightNo = flightNo;
    }

    public void setAirlineCode(String airlineCode) {
        this.airlineCode = airlineCode;
    }

    public void setAirlineName(String airlineName) {
        this.airlineName = airlineName;
    }

    public void setPunctualityRate(double punctualityRate) {
        this.punctualityRate = punctualityRate;
    }

    public void setDepartureCityName(String departureCityName) {
        this.departureCityName = departureCityName;
    }

    public void setDepartureCityCode(String departureCityCode) {
        this.departureCityCode = departureCityCode;
    }

    public void setDeptAirportName(String deptAirportName) {
        this.deptAirportName = deptAirportName;
    }

    public void setDeptAirportCode(String deptAirportCode) {
        this.deptAirportCode = deptAirportCode;
    }

    public void setDepartureTerminal(String departureTerminal) {
        this.departureTerminal = departureTerminal;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public void setArrivalCityName(String arrivalCityName) {
        this.arrivalCityName = arrivalCityName;
    }

    public void setArrivalCityCode(String arrivalCityCode) {
        this.arrivalCityCode = arrivalCityCode;
    }

    public void setArrivalAirportName(String arrivalAirportName) {
        this.arrivalAirportName = arrivalAirportName;
    }

    public void setArrivalAirportCode(String arrivalAirportCode) {
        this.arrivalAirportCode = arrivalAirportCode;
    }

    public void setArrivalTerminal(String arrivalTerminal) {
        this.arrivalTerminal = arrivalTerminal;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public void setLowestBabyCfPrice(int lowestBabyCfPrice) {
        this.lowestBabyCfPrice = lowestBabyCfPrice;
    }

    public void setLowestChildCfPrice(int lowestChildCfPrice) {
        this.lowestChildCfPrice = lowestChildCfPrice;
    }

    public void setLowestCfPrice(int lowestCfPrice) {
        this.lowestCfPrice = lowestCfPrice;
    }

    public void setLowestBabyPrice(int lowestBabyPrice) {
        this.lowestBabyPrice = lowestBabyPrice;
    }

    public void setLowestChildPrice(int lowestChildPrice) {
        this.lowestChildPrice = lowestChildPrice;
    }

    public void setLowestPrice(int lowestPrice) {
        this.lowestPrice = lowestPrice;
    }

    public void setCraftCode(String craftCode) {
        this.craftCode = craftCode;
    }

    public void setCraftKind(String craftKind) {
        this.craftKind = craftKind;
    }

    public void setCraftName(String craftName) {
        this.craftName = craftName;
    }

    public void setLegs(List<Leg> legs) {
        this.legs = legs;
    }

   /* @Override
    public String toString() {
        StringBuilder str = new StringBuilder(
                "[" +
                "id:" + id +
                ", flightNo:'" + flightNo + '\'' +
                ", airlineCode:'" + airlineCode + '\'' +
                ", airlineName:'" + airlineName + '\'' +
                ", punctualityRate:" + punctualityRate +
                ", arrivalCityName:'" + arrivalCityName + '\'' +
                ", arrivalCityCode:'" + arrivalCityCode + '\'' +
                ", arrivalAirportName:'" + arrivalAirportName + '\'' +
                ", arrivalAirportCode:'" + arrivalAirportCode + '\'' +
                ", arrivalTerminal:'" + arrivalTerminal + '\'' +
                ", arrivalTime:'" + arrivalTime + '\'' +
                ", departureCityName:'" + departureCityName + '\'' +
                ", departureCityCode:'" + departureCityCode + '\'' +
                ", deptAirportName:'" + deptAirportName + '\'' +
                ", deptAirportCode:'" + deptAirportCode + '\'' +
                ", departureTerminal:'" + departureTerminal + '\'' +
                ", departureTime:'" + departureTime + '\'' +
                ", duration:" + duration +
                ", lowestBabyCfPrice:" + lowestBabyCfPrice +
                ", lowestChildCfPrice:" + lowestChildCfPrice +
                ", lowestCfPrice:" + lowestCfPrice +
                ", lowestBabyPrice:" + lowestBabyPrice +
                ", lowestChildPrice:" + lowestChildPrice +
                ", lowestPrice:" + lowestPrice +
                ", craftCode:'" + craftCode + '\'' +
                ", craftKind:'" + craftKind + '\'' +
                ", craftName:'" + craftName + '\'' +
                ", legs:" + legs +
                ']');
        if (legs != null) {
            str.append("Legs:[");
            for (Leg l:legs){
                str.append("t").append(l);
            }
        }
        return str.toString();
    }*/
}

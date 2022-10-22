package net.suncaper.flyrandomgo.Bean;

public class Leg {

    private int id;
    private int record_id;
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
    private String craftCode;
    private String craftKind;
    private String craftName;


    public Leg() {}

    public Leg(int id, int record_id, String flightNo, String airlineCode, String airlineName, double punctualityRate, String arrivalCityName, String arrivalCityCode, String arrivalAirportName, String arrivalAirportCode, String arrivalTerminal, String arrivalTime, String departureCityName, String departureCityCode, String deptAirportName, String deptAirportCode, String departureTerminal, String departureTime, int duration, String craftCode, String craftKind, String craftName) {
        this.id = id;
        this.record_id = record_id;
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
        this.craftCode = craftCode;
        this.craftKind = craftKind;
        this.craftName = craftName;

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRecord_id() {
        return record_id;
    }

    public void setRecord_id(int record_id) {
        this.record_id = record_id;
    }

    public String getFlightNo() {
        return flightNo;
    }

    public void setFlightNo(String flightNo) {
        this.flightNo = flightNo;
    }

    public String getAirlineCode() {
        return airlineCode;
    }

    public void setAirlineCode(String airlineCode) {
        this.airlineCode = airlineCode;
    }

    public String getAirlineName() {
        return airlineName;
    }

    public void setAirlineName(String airlineName) {
        this.airlineName = airlineName;
    }

    public double getPunctualityRate() {
        return punctualityRate;
    }

    public void setPunctualityRate(double punctualityRate) {
        this.punctualityRate = punctualityRate;
    }

    public String getDepartureCityName() {
        return departureCityName;
    }

    public void setDepartureCityName(String departureCityName) {
        this.departureCityName = departureCityName;
    }

    public String getDepartureCityCode() {
        return departureCityCode;
    }

    public void setDepartureCityCode(String departureCityCode) {
        this.departureCityCode = departureCityCode;
    }

    public String getDeptAirportName() {
        return deptAirportName;
    }

    public void setDeptAirportName(String deptAirportName) {
        this.deptAirportName = deptAirportName;
    }

    public String getDeptAirportCode() {
        return deptAirportCode;
    }

    public void setDeptAirportCode(String deptAirportCode) {
        this.deptAirportCode = deptAirportCode;
    }

    public String getDepartureTerminal() {
        return departureTerminal;
    }

    public void setDepartureTerminal(String departureTerminal) {
        this.departureTerminal = departureTerminal;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalCityName() {
        return arrivalCityName;
    }

    public void setArrivalCityName(String arrivalCityName) {
        this.arrivalCityName = arrivalCityName;
    }

    public String getArrivalCityCode() {
        return arrivalCityCode;
    }

    public void setArrivalCityCode(String arrivalCityCode) {
        this.arrivalCityCode = arrivalCityCode;
    }

    public String getArrivalAirportName() {
        return arrivalAirportName;
    }

    public void setArrivalAirportName(String arrivalAirportName) {
        this.arrivalAirportName = arrivalAirportName;
    }

    public String getArrivalAirportCode() {
        return arrivalAirportCode;
    }

    public void setArrivalAirportCode(String arrivalAirportCode) {
        this.arrivalAirportCode = arrivalAirportCode;
    }

    public String getArrivalTerminal() {
        return arrivalTerminal;
    }

    public void setArrivalTerminal(String arrivalTerminal) {
        this.arrivalTerminal = arrivalTerminal;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getCraftCode() {
        return craftCode;
    }

    public void setCraftCode(String craftCode) {
        this.craftCode = craftCode;
    }

    public String getCraftKind() {
        return craftKind;
    }

    public void setCraftKind(String craftKind) {
        this.craftKind = craftKind;
    }

    public String getCraftName() {
        return craftName;
    }

    public void setCraftName(String craftName) {
        this.craftName = craftName;
    }

    @Override
    public String toString() {
        return "[" +
                "id:" + id +
                ", record_id:" + record_id +
                ", flightNo:\"" + flightNo + '\"' +
                ", airlineCode:\"" + airlineCode + '\"' +
                ", airlineName:\"" + airlineName + '\"' +
                ", punctualityRate:" + punctualityRate +
                ", departureCityName:\"" + departureCityName + '\"' +
                ", departureCityCode:\"" + departureCityCode + '\"' +
                ", deptAirportName:\"" + deptAirportName + '\"' +
                ", deptAirportCode:\"" + deptAirportCode + '\"' +
                ", departureTerminal:\"" + departureTerminal + '\"' +
                ", departureTime:\"" + departureTime + '\"' +
                ", arrivalCityName:\"" + arrivalCityName + '\"' +
                ", arrivalCityCode:\"" + arrivalCityCode + '\"' +
                ", arrivalAirportName:\"" + arrivalAirportName + '\"' +
                ", arrivalAirportCode:\"" + arrivalAirportCode + '\"' +
                ", arrivalTerminal:\"" + arrivalTerminal + '\"' +
                ", arrivalTime:\"" + arrivalTime + '\"' +
                ", duration:" + duration +
                ", craftCode:\"" + craftCode + '\"' +
                ", craftKind:\"" + craftKind + '\"' +
                ", craftName:\"" + craftName + '\"' +
                ']';
    }
}

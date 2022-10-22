package net.suncaper.flyrandomgo.Bean;

import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LegMapper implements RowMapper<Leg> {
    public Leg mapRow(ResultSet rs, int rowNum) throws SQLException {
        Leg leg = new Leg();

        leg.setId(rs.getInt("id"));
        leg.setRecord_id(rs.getInt("record_id"));
        leg.setFlightNo(rs.getString("flightNo"));
        leg.setAirlineCode(rs.getString("airlineCode"));
        leg.setAirlineName(rs.getString("airlineName"));
        leg.setPunctualityRate(rs.getDouble("punctualityRate"));

        leg.setArrivalCityName(rs.getString("arrivalCityName"));
        leg.setArrivalCityCode(rs.getString("arrivalCityCode"));
        leg.setArrivalAirportName(rs.getString("arrivalAirportName"));
        leg.setArrivalAirportCode(rs.getString("arrivalAirportCode"));
        leg.setArrivalTerminal(rs.getString("arrivalTerminal"));
        leg.setArrivalTime(rs.getString("arrivalTime"));

        leg.setDepartureCityName(rs.getString("departureCityName"));
        leg.setDepartureCityCode(rs.getString("departureCityCode"));
        leg.setDeptAirportName(rs.getString("deptAirportName"));
        leg.setDeptAirportCode(rs.getString("deptAirportCode"));
        leg.setDepartureTerminal(rs.getString("departureTerminal"));
        leg.setDepartureTime(rs.getString("departureTime"));

        leg.setDuration(rs.getInt("duration"));
        leg.setCraftCode(rs.getString("craftCode"));
        leg.setCraftKind(rs.getString("craftKind"));
        leg.setCraftName(rs.getString("craftName"));


        return leg;
    }
}

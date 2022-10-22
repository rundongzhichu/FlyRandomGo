package net.suncaper.flyrandomgo.Bean;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RouteMapper implements RowMapper<Route> {
    public Route mapRow(ResultSet rs, int rowNum) throws SQLException {
        Route route = new Route();

        route.setId(rs.getInt("id"));
        route.setFlightNo(rs.getString("flightNo"));
        route.setAirlineCode(rs.getString("airlineCode"));
        route.setAirlineName(rs.getString("airlineName"));
        route.setPunctualityRate(rs.getDouble("punctualityRate"));

        route.setArrivalCityName(rs.getString("arrivalCityName"));
        route.setArrivalCityCode(rs.getString("arrivalCityCode"));
        route.setArrivalAirportName(rs.getString("arrivalAirportName"));
        route.setArrivalAirportCode(rs.getString("arrivalAirportCode"));
        route.setArrivalTerminal(rs.getString("arrivalTerminal"));
        route.setArrivalTime(rs.getString("arrivalTime"));

        route.setDepartureCityName(rs.getString("departureCityName"));
        route.setDepartureCityCode(rs.getString("departureCityCode"));
        route.setDeptAirportName(rs.getString("deptAirportName"));
        route.setDeptAirportCode(rs.getString("deptAirportCode"));
        route.setDepartureTerminal(rs.getString("departureTerminal"));
        route.setDepartureTime(rs.getString("departureTime"));

        route.setDuration(rs.getInt("duration"));

        route.setLowestBabyCfPrice(rs.getInt("lowestBabyCfPrice"));
        route.setLowestChildCfPrice(rs.getInt("lowestChildCfPrice"));
        route.setLowestCfPrice(rs.getInt("lowestCfPrice"));
        route.setLowestBabyPrice(rs.getInt("lowestBabyCfPrice"));
        route.setLowestChildPrice(rs.getInt("lowestChildPrice"));
        route.setLowestPrice(rs.getInt("lowestPrice"));

        route.setCraftCode(rs.getString("craftCode"));
        route.setCraftKind(rs.getString("craftKind"));
        route.setCraftName(rs.getString("craftName"));


        return route;

    }
}

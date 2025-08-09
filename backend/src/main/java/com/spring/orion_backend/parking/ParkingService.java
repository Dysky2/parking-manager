package com.spring.orion_backend.parking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@Service
public class ParkingService {

    @Autowired
    private ParkingRepository parkingRepository;

    public Parking updateSpaceStatus(String id, String newStatus, String vehiclePlate, String userEmail, Instant createdDataTime) {
        Parking parking = parkingRepository.findById(id).orElseThrow();

        String cleanStatus = newStatus.replaceAll("\"", "");

        parking.setStatus(cleanStatus);

        if (vehiclePlate != null) {
            parking.setVehiclePlate(vehiclePlate);
        } else {
            parking.setVehiclePlate(parking.getVehiclePlate());
        }

        if (userEmail != null) {
            parking.setUserEmail(userEmail);
        }

        if(createdDataTime != null) {
            parking.setCreatedDataTime(createdDataTime);
        } else {
            parking.setCreatedDataTime(parking.getCreatedDataTime());
        }

        parkingRepository.save(parking);
        return parking;
    }

    public Parking addParkingSpace(String parkingSpaceName) {
        Parking parking = new Parking();

        parking.setStatus("Available");
        parking.setParkingSpaceName(parkingSpaceName);

        Date date = new Date();
        parking.setCreatedDataTime(date.toInstant());

        return parkingRepository.save(parking);
    }
}

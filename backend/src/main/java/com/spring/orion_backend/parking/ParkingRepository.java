package com.spring.orion_backend.parking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParkingRepository extends JpaRepository<Parking, String> {
    List<Parking> findAllByStatus(String status);

    Integer countByStatus(String string);
}

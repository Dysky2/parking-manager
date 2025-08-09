package com.spring.orion_backend.parking;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name="parking_spaces")
public class Parking {
    @Id
    @GeneratedValue(strategy =  GenerationType.UUID)
    @Column(name = "parking_space_id")
    private String parkingSpaceId;

    private String parkingSpaceName;

    private String userEmail;

    private String vehiclePlate;

    private String status;

    private Instant createdDataTime;
}

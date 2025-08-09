package com.spring.orion_backend.parking;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
public class StatusUpdateRequest {
    private String status;
    private String vehiclePlate;
    private String userEmail;
    private Instant createdDataTime;
}

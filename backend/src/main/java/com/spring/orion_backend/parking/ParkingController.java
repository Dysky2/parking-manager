package com.spring.orion_backend.parking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200" , allowedHeaders = "*")
@RestController
@RequestMapping("/api/parking")
public class ParkingController {
    @Autowired
    private ParkingRepository parkingRepository;

    @Autowired
    private ParkingService parkingService;

    @GetMapping("/all")
    public List<Parking> getAllParkingSpace() {
        return parkingRepository.findAll();
    }

    @GetMapping("/allByStatus")
    public List<Parking> getAllParkingSpaceByStatus(@RequestParam String status) {
        return parkingRepository.findAllByStatus(status);
    }

    @PostMapping("/statusChange/{id}")
    public Parking changeStatus(@RequestBody StatusUpdateRequest request, @PathVariable String id) {
        return parkingService.updateSpaceStatus(id,
                request.getStatus(),
                request.getVehiclePlate(),
                request.getUserEmail(),
                request.getCreatedDataTime());
    }

    @GetMapping("/countAll")
    public long countAll() { return parkingRepository.count(); }

    @GetMapping("/countByStatus")
    public Integer countByStatus(@RequestParam String status) {return parkingRepository.countByStatus(status); }

    @PostMapping("/addParkingSpace")
    public Parking addParkingSpace(@RequestParam String parkingNameSpace) {return  parkingService.addParkingSpace(parkingNameSpace); }

}

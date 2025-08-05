export interface ParkingSpace {
    parkingSpaceId: string;
    parkingSpaceName: string;
    userEmail: string;
    vehiclePlate: string;
    status: 'Available' | 'Occupied' | 'Reserved' | 'Maintenance';
    createdDataTime?: Date;
}
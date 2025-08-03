export interface ParkingCard {
    id: number;
    name: string;
    status: 'Available' | 'Occupied' | 'Reserved' | 'Maintenance';
    vehiclePlate: string;
}

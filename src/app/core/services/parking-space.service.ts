import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkingSpace } from '../models/parkingSpace.modal';

@Injectable({
  providedIn: 'root'
})
export class ParkingSpaceService {

    private apiUrl = "http://localhost:8080/api/parking";

  constructor(private http: HttpClient) { }

  getAllParkingSpaces(): Observable<ParkingSpace[]> {
    return this.http.get<ParkingSpace[]>(`${this.apiUrl}/all`);
  }

  getAllParkingSpacesByStatus(status: string): Observable<ParkingSpace[]> {
    return this.http.get<ParkingSpace[]>(`${this.apiUrl}/allByStatus`, { params: { status } });
  }

  changeParkingSpaceStatus(spaceId: string, status: string, vehiclePlate?: string, userEmail?: string, createdDataTime?: String) {
    return this.http.post(`${this.apiUrl}/statusChange/${spaceId}`, {status, vehiclePlate, userEmail, createdDataTime});
  }

  getNumberOfParkingSpaces(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/countAll`);
  }

  getNumberOfParkingSpacesByStatus(status: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/countByStatus`, {params: { status } });
  }

}

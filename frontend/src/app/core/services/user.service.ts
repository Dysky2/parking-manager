import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';
import { SuccessResponse } from "../models/successResponse.modal";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "https://parking-manager-crdt.onrender.com";

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  getUserById(userId: string) {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/createUser`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/updateUser`, user);
  }

  deleteUser(userId: string) {
    return this.http.delete<User>(`${this.apiUrl}/delete/${userId}`);
  }

  logIn(email: string, password: string): Observable<User | null> {
    const credentials = {email, password };
    return this.http.post<User>(`${this.apiUrl}/login`, credentials);
  }

  isAccountExist(email: string, password: string) {
    const credentials = {email, password };
    return this.http.post<boolean>(`${this.apiUrl}/isExist`, credentials);
  }

  updatePassword(email: string, currentPassword: string, newPassword: string, confirmNewPassword: string): Observable<SuccessResponse> {
    const credentials = {email, currentPassword, newPassword, confirmNewPassword};
    return this.http.post<SuccessResponse>(`${this.apiUrl}/updatePassword`, credentials);
  }

  getLoggedUser(user: User) {
    const currentDate = new Date();
    const params = new HttpParams().append("userId", user.userId)
                                  .append("name", user.name)
                                  .append("surname", user.surname)
                                  .append("email", user.email)
                                  .append("password", user.password)
                                  .append("createdDataTime", currentDate.toISOString());
    return this.http.get<User>(`${this.apiUrl}/getLoggedUser`, {params: params});
  }

}

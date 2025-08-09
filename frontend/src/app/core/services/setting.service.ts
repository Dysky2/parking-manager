import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Setting} from "../models/setting.modal";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private apiUrl: string = 'https://parking-manager-crdt.onrender.com/api/settings';

  constructor(private http: HttpClient) { }

  getAllSettings(): Observable<Setting[]>  {
    return this.http.get<Setting[]>(`${this.apiUrl}/all`);
  }
}

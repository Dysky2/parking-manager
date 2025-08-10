import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Setting} from "../models/setting.modal";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private apiUrl = environment.apiUrl + '/api/settings';

  constructor(private http: HttpClient) { }

  getAllSettings(): Observable<Setting[]>  {
    return this.http.get<Setting[]>(`${this.apiUrl}/all`);
  }
}

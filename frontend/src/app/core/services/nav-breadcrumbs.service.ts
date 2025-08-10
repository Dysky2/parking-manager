import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBreadcrumbsService {
  private currentPageSubject = new BehaviorSubject<string>("Dashboard");
  public currentPage = this.currentPageSubject.asObservable();

  constructor() { }

  setSelectedPage(tabName: string) {
    this.currentPageSubject.next(tabName);
  }
}

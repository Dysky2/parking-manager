import { Injectable, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import {async, map, Observable, of, tap} from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  token: string = '';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public  currentUser$ = this.currentUserSubject.asObservable();

  private authStateCheckedSubject = new BehaviorSubject<boolean>(false);
  public authStateChecked$ = this.authStateCheckedSubject.asObservable();

  constructor(private userService: UserService,
              private router: Router,
              private messageService: MessageService,) {
    this.checkInitialAuthState();
   }

  isNotEmpty(value: any): boolean {
    return value != null || value != undefined || value != "";
  }

  ngOnInit(): void {}

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isLoggedIn(): boolean {
   return this.getToken() !== "";
  }

  logIn(email: string, password: string) {
    this.userService.logIn(email, password).subscribe({
      next: (user) => {
        console.log(user);
        if(user != null) {
          this.setToken(user.userId);
          this.messageService.add({ severity: 'info', summary: 'LogIn', detail: 'You are succeed login', life: 2000 });
          this.setLoggedInUser(user);
          this.router.navigate(["./dashboard"]);
        } else {
          this.messageService.add({ severity: 'error', summary: 'LogIn', detail: 'Email or password is incorrect', life: 2000 });
        }
      },
      error: (error) => {
        console.error(error)
        this.messageService.add({ severity: 'error', summary: 'LogIn', detail: `Something went wrong`, life: 2000 });
      }
    });
  }

  logOut() {
    this.token = ''
    localStorage.setItem('token', "");
    localStorage.removeItem("token");
    this.messageService.add({ severity: 'info', summary: 'Log out', detail: 'You are succeed logout', life: 2000 });
    this.currentUserSubject.next(null);
    window.location.reload();
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  isAdminLogged(): Observable<boolean>{
    const token = this.getToken();

    if(!token) {
      return of(false);
    }

    return this.userService.getUserById(token).pipe(
      map(user => {
        return user && user.role === "Admin";
      })
    )
  }

  getLoggedUser(): Observable<User | null> {
    const token = this.getToken();

    if(!token) {
      return of(null);
    }

    return this.userService.getUserById(token);
  }

  checkInitialAuthState(): void {
    const token = this.getToken();

    if(!token) {
      this.currentUserSubject.next(null);
      this.authStateCheckedSubject.next(true);
      return;
    }

    this.userService.getUserById(token).subscribe({
      next: (user) => {
        this.currentUserSubject.next(user);
        this.authStateCheckedSubject.next(true);
      },
      error: () => {
        this.logOut();
        this.authStateCheckedSubject.next(true);
      }
    })
  }
  setLoggedInUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }
}

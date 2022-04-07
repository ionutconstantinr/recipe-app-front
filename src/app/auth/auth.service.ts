import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null!);
  token!: string;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<{ token: string; id: string }>(
        'http://localhost:8080/user/authenticate',
        {
          email: email,
          password: password,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(email, responseData.token, responseData.id);
        })
      );
  }

  logout() {
    this.user.next(null!);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }

  autoLogin() {
    const userData: {
      email: string;
      _token: string;
      id: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData._token, userData.id);

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorResponse.error || !errorResponse.error.status) {
      return throwError(errorMessage);
    }
    if (errorResponse.error.status === 403) {
      errorMessage = 'Invalid password or email!';
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, token: string, id: string) {
    const user = new User(email, token, id);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}

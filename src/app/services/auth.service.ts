import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { User } from '../models/user/user';
import { HttpClient } from '@angular/common/http';
import { UserCredentialsDto } from '../models/user/user-credentials.dto';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  username = '';

  constructor(private http: HttpClient) {
  }

  login(userDto: UserCredentialsDto) {
    return this.http.post<UserCredentialsDto>(`${environment.apiUrl}/auth/login`, userDto).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      }),
    );
  }

  register(userDto: UserCredentialsDto) {
    return this.http.post<string>(`${environment.apiUrl}/auth/registration`, userDto);
  }

  getCurrentUser() {
    return this.http.get<User>(`${environment.apiUrl}/users/currentUser`).pipe(
      tap((response: User) => {
        this.username = response.username;
      }),
    );
  }
}

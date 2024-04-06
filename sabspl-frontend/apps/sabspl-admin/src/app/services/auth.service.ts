import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../../../api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly USER_DETAILS = 'user_details';
  constructor(
    private http: HttpClient
  ) { }

  login(response: any): void {
    localStorage.setItem(this.TOKEN_KEY, response.jwt);
    localStorage.setItem(this.USER_DETAILS, JSON.stringify({
      username: response.name,
      email: response.email
    }));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  checkTokenExpired(): boolean {
    const token = this.getToken();
    if(token) {
      const tokenExpirationDate = this.getTokenExpirationDate(token);
      if(tokenExpirationDate && tokenExpirationDate <= new Date()) {
        this.logout();
        return true;
      }
    }
    return false;
  }

  private getTokenExpirationDate(token: string): Date | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp ? new Date(payload.exp * 1000): null;
    } catch(error) {
      console.log('Error parsing token payload:', error);
      return null;
    }
  }

  doLogin(loginPayload: any) : Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}${API_CONFIG.generalEndpoints.ADMIN_LOGIN}`, loginPayload);
  }
}

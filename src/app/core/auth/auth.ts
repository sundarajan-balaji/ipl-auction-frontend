import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CurrentUser {
  attributes: {
    sub: string;
    email: string;
    name: string;
    given_name?: string;
    picture: string;
  };
  authorities: string[];
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly http = inject(HttpClient);

  private readonly backendUrl = 'https://ipl-auction-backend-vrgz.onrender.com';

  loginWithGoogle(): void {
    window.location.href = `${this.backendUrl}/oauth2/authorization/google`;
  }

  getCurrentUser(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${this.backendUrl}/api/me`, {
      withCredentials: true,
    });
  }
}

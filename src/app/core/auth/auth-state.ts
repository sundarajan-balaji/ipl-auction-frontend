import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Auth, CurrentUser } from './auth';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  private readonly auth = inject(Auth);

  private readonly currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);

  readonly currentUser$ = this.currentUserSubject.asObservable();

  private readonly authenticatedSubject = new BehaviorSubject<boolean>(false);

  readonly isAuthenticated$ = this.authenticatedSubject.asObservable();

  loadCurrentUser(): Observable<CurrentUser | null> {
    return this.auth.getCurrentUser().pipe(
      tap({
        next: (user) => {
          this.currentUserSubject.next(user);
          this.authenticatedSubject.next(true);
        },
        error: () => {
          this.currentUserSubject.next(null);
          this.authenticatedSubject.next(false);
        },
      }),
      catchError(() => of(null)),
    );
  }

  get currentUser(): CurrentUser | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return this.authenticatedSubject.value;
  }

  get role(): string | null {
    const authorities = this.currentUser?.authorities ?? [];

    return authorities.find((authority) => authority.startsWith('ROLE_')) ?? null;
  }
}

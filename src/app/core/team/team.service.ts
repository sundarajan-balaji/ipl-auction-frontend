import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Team {
  id: number;
  name: string;
  shortCode: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private readonly http = inject(HttpClient);

  private readonly backendUrl = 'https://ipl-auction-backend-vrgz.onrender.com';

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.backendUrl}/api/teams`, {
      withCredentials: true,
    });
  }

  getTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.backendUrl}/api/teams/${id}`, {
      withCredentials: true,
    });
  }
}

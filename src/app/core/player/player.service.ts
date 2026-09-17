import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Player {
  id: number;
  cricsheetPlayerId: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly http = inject(HttpClient);

  private readonly backendUrl = 'https://ipl-auction-backend-vrgz.onrender.com';

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.backendUrl}/api/players`, {
      withCredentials: true,
    });
  }

  getPlayerById(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.backendUrl}/api/players/${id}`, {
      withCredentials: true,
    });
  }
}

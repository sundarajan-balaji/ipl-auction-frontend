import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Auction {
  id: number;
  name: string;
  season: string;
  status: string;
  startingPurse: number;
  bidIncrement: number;
  currentPlayerId: number | null;
  currentPlayerName: string | null;
  currentPlayerBasePrice: number | null;
  currentPlayerStatus: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  private readonly http = inject(HttpClient);

  private readonly backendUrl = 'https://ipl-auction-backend-vrgz.onrender.com';

  getAllAuctions(): Observable<Auction[]> {
    return this.http.get<Auction[]>(`${this.backendUrl}/api/auctions`, {
      withCredentials: true,
    });
  }

  getAuctionById(id: number): Observable<Auction> {
    return this.http.get<Auction>(`${this.backendUrl}/api/auctions/${id}`, {
      withCredentials: true,
    });
  }
}

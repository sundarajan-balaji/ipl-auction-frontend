import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { forkJoin } from 'rxjs';

import { AuthState } from '../../core/auth/auth-state';
import { Auction, AuctionService } from '../../core/auction/auction.service';
import { TeamService } from '../../core/team/team.service';
import { PlayerService } from '../../core/player/player.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  readonly authState = inject(AuthState);

  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  private readonly auctionService = inject(AuctionService);
  private readonly teamService = inject(TeamService);
  private readonly playerService = inject(PlayerService);

  auctions: Auction[] = [];
  currentAuction: Auction | null = null;

  teamCount = 0;
  playerCount = 0;

  isLoading = true;
  hasError = false;

  constructor() {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {

  console.log('Dashboard: starting data load');

  forkJoin({
    auctions: this.auctionService.getAllAuctions(),
    teams: this.teamService.getAllTeams(),
    players: this.playerService.getAllPlayers(),
  }).subscribe({

    next: ({ auctions, teams, players }) => {

      console.log('Dashboard: forkJoin completed');
      console.log('Auctions:', auctions);
      console.log('Teams:', teams);
      console.log('Players:', players);

      this.auctions = auctions;
      this.teamCount = teams.length;
      this.playerCount = players.length;

      this.currentAuction =
        auctions.find(
          auction => auction.status === 'LIVE'
        ) ?? auctions[0] ?? null;

      this.isLoading = false;

      this.changeDetectorRef.markForCheck();

      console.log('Dashboard: isLoading =', this.isLoading);
    },

    error: (error) => {

      console.error(
        'Dashboard: forkJoin failed',
        error
      );

      this.isLoading = false;
      this.hasError = true;

      this.changeDetectorRef.markForCheck();
    },

    complete: () => {
      console.log('Dashboard: subscription completed');
    }
  });
}
}

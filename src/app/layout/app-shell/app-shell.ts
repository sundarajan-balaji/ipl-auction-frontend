import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthState } from '../../core/auth/auth-state';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css',
})
export class AppShell {
  readonly authState = inject(AuthState);
}

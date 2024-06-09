import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  email: string = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authSrvice: AuthService
  ) {
    const localStorage = document.defaultView?.localStorage;

    if (localStorage) {
      this.email = localStorage.getItem('userEmail') ?? '';

      if (this.email === '') {
        localStorage.setItem('userEmail', '');
      }
    }
  }

  logout() {
    const localStorage = this.document.defaultView?.localStorage;

    if (localStorage) {
      this.email = localStorage.getItem('userEmail') ?? '';

      if (this.email !== '') {
        this.authSrvice.logout();
        localStorage.setItem('userEmail', '');
        this.email = localStorage.getItem('userEmail') ?? '';
      }
    }
  }
}

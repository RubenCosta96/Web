import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  hidenLogin = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkAuthentication();
    this.isRouteActive('login');
  }

  isRouteActive(route: string) {
    this.router.events.subscribe((event) => {
      let status = this.router.url.includes(route);
      this.hidenLogin = status;
      console.log(status);
    });
  }

  checkAuthentication() {
    this.authService.getCurrentUser().then((user) => {
      this.isLoggedIn = !!user;
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    window.location.href = '/login';
  }

  isNotHome(): boolean {
    return this.router.url !== '/home' && this.router.url !== '/';
  }
}

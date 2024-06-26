import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';
import { initFlowbite } from 'flowbite';

export function isNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
  return obj === null || obj === undefined;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sabsep';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    initFlowbite();
    this.router.events
    .pipe(
      filter((event) => event instanceof NavigationStart && event.url === '/login')
    )
    .subscribe({
      next: (res: any) => {
        if(this.authService.isLoggedIn() && !this.authService.checkTokenExpired()){
          this.router.navigate(['admin','dashboard'])
        }
      }
    });
  }
}

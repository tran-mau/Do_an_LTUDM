import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {
  // username: string = localStorage.getItem('username') || 'Guest';
  currentRoute: string = '';

  private setUsername() {
    const userName = document.getElementById('username') as HTMLInputElement;

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      userName.innerHTML = storedUsername;
    }
  }
  title = 'qlct-ui';
  // activeSection: string = 'home';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
        console.log('Current route:', this.currentRoute);
      });

    // Set initial route
    this.currentRoute = this.router.url;
  }

  // Method để navigate
  navigate(route: string) {
    this.router.navigate([route]);
  }

  // Method để check active state
  isActive(route: string): boolean {
    // Exact match hoặc starts with (để handle sub-routes)
    return this.currentRoute === route || 
           (route !== '/dashboard' && this.currentRoute.startsWith(route));
  }

  ngAfterViewInit(): void {
    this.setupMenuListeners();
    this.setUsername();
  }

  setupMenuListeners() {
    const menuItems = document.querySelectorAll('.nav-item');

    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        
        const url = (item as HTMLElement).dataset['url'];

        if (url) {
          const parts = url.split('/');
          const section = parts[1] || '(trống)';
          console.log('Section:', section);
          console.log('URL:', url);
          const activeSection = item.getAttribute('data-section') || 'home';
          menuItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          this.router.navigateByUrl(url);
        }

      });
    });
  }

  calendarClicked() {
    console.log('Calendar icon clicked');
    const calendar = document.getElementById('date-input') as HTMLInputElement;
    if (calendar) {
      calendar.click(); // Open date picker
      console.log('Date input clicked');
    } else {
      console.error('Date input element not found');
    }
  }
}
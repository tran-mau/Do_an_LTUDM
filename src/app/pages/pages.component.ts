import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {
  title = 'qlct-ui';
  // activeSection: string = 'home';

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.setupMenuListeners();
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
}

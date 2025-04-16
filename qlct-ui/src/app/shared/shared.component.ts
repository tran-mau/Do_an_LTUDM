import { Component, OnInit } from '@angular/core';
import { SettingComponent } from '../pages/setting/setting.component';
import { ContentComponent } from '../components/content-dashboard/content-dashboard.component';

@Component({
  selector: 'app-shared',
  imports: [
    SettingComponent,
    ContentComponent
  ],
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.css'
})
export class SharedComponent implements OnInit {
  activeSection: string = 'home';
  
  ngOnInit(): void {
    this.setupMenuListeners();
  }
  
  setupMenuListeners() {
    const menuItems = document.querySelectorAll('.nav-item');

    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        this.activeSection = item.getAttribute('data-section') || 'home';
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }
}

import { Component } from '@angular/core';

interface NavItem {
  id: string;
  icon: string;
  label: string;
  active: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { id: 'home', icon: 'fas fa-home', label: 'Home', active: true },
    { id: 'history', icon: 'fas fa-clock', label: 'Lịch sử giao dịch', active: false },
    { id: 'transactions', icon: 'fas fa-credit-card', label: 'Thu chi', active: false },
    { id: 'budget', icon: 'fas fa-list', label: 'Lập ngân sách', active: false },
    { id: 'settings', icon: 'fas fa-cog', label: 'Cài đặt', active: false }
  ];

  setActiveItem(selectedItem: NavItem): void {
    this.navItems.forEach(item => {
      item.active = item.id === selectedItem.id;
    });
  }

  // Optional: Initialize with route detection
  constructor() {
    // You can add route detection logic here later
  }
}
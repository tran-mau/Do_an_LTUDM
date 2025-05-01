import { Component, OnInit } from '@angular/core';
import { EditProfileComponent } from './content-card/edit-profile/edit-profile.component';
import { AccountSectionComponent } from './content-card/account-section/account-section.component';
import { InterfaceSectionComponent } from './content-card/interface-section/interface-section.component';
import { CommonModule } from '@angular/common';
import { LogoutSectionComponent } from './content-card/logout-section/logout-section.component';

@Component({
  selector: 'app-setting',
  imports: [
    EditProfileComponent,
    AccountSectionComponent,
    InterfaceSectionComponent,
    LogoutSectionComponent,
    CommonModule
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit {
  activeSection: String = 'edit-profile';

  constructor() { }
  ngOnInit(): void {
    this.setupMenuListeners();
  }

  setupMenuListeners() {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        this.activeSection = item.getAttribute('data-section') || 'edit-profile';
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }
}

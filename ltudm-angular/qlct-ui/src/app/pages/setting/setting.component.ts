import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountSectionComponent } from './content-card/account-section/account-section.component';
import { EditProfileComponent } from './content-card/edit-profile/edit-profile.component';
import { InterfaceSectionComponent } from './content-card/interface-section/interface-section.component';
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
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  activeSection: string = 'edit-profile';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['section']) {
        this.activeSection = params['section'];
      } else {
        // Nếu không có section trong URL, tự redirect sang section mặc định
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { section: 'edit-profile' },
          replaceUrl: true // thay thế url hiện tại để tránh stack lịch sử
        });
      }
    });
  }

  onMenuClick(section: string) {
    if (section === this.activeSection) return; // tránh reload lại

    this.activeSection = section;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { section: section },
      queryParamsHandling: 'merge'
    });
  }
}

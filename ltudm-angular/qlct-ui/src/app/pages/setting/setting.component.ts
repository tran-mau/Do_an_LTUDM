import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AccountSectionComponent } from './content-card/account-section/account-section.component';
import { EditProfileComponent } from './content-card/edit-profile/edit-profile.component';
import { InterfaceSectionComponent } from './content-card/interface-section/interface-section.component';
import { LogoutSectionComponent } from './content-card/logout-section/logout-section.component';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [
    EditProfileComponent,
    AccountSectionComponent,
    InterfaceSectionComponent,
    LogoutSectionComponent,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  activeSection: string = 'edit-profile';
  profileData: any = null; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService 
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['section']) {
        this.activeSection = params['section'];
      } else {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { section: 'edit-profile' },
          replaceUrl: true
        });
      }

      if (params['section'] === 'edit-profile') {
        this.loadProfile();
      }
    });
  }

  loadProfile() {
    this.profileService.getUserProfile().subscribe({
      next: (data: any) => {
        this.profileData = data;
      },
      error: (err: any) => {
        console.error('Failed to load profile:', err);
      }
    });
  }

  onMenuClick(section: string) {
    if (section === this.activeSection) return;

    this.activeSection = section;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { section },
      queryParamsHandling: 'merge'
    });
  }
}

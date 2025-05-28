import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-section',
  imports: [],
  templateUrl: './logout-section.component.html',
  styleUrl: './logout-section.component.css'
})
export class LogoutSectionComponent {
  constructor(private router: Router) { }

  logout() {
    // Xóa tất cả dữ liệu trong localStorage
    localStorage.clear();

    // Điều hướng về trang login (hoặc trang khác tùy ý)
    this.router.navigate(['/login']);
  }
}

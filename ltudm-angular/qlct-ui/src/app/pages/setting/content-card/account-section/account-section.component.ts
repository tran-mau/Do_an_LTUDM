import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../../../services/profile.service';

@Component({
    selector: 'app-account-section',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './account-section.component.html',
    styleUrls: ['./account-section.component.css']
})
export class AccountSectionComponent {
    username: string;
    currentPassword: string = '';
    newPassword: string = '';
    confirmPassword: string = '';
    errorMessage: string = '';
    showChangePassword: boolean = false;

    constructor(
        private router: Router,
        private profileService: ProfileService
    ) {
        this.username = localStorage.getItem('username') || 'User';
    }

    toggleChangePassword() {
        this.showChangePassword = !this.showChangePassword;
        if (!this.showChangePassword) {
            this.resetPasswordForm();
        }
    }

    private resetPasswordForm() {
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        this.errorMessage = '';
    }

    async submitChangePassword() {
        if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        if (this.newPassword !== this.confirmPassword) {
            alert('Mật khẩu mới không khớp!');
            return;
        }

        const payload = {
            username: this.username,
            newPassword: this.newPassword
        };

        this.profileService.changePassword(payload).subscribe({
            next: () => {
                alert('Đổi mật khẩu thành công!');
                this.resetPasswordForm();
                this.showChangePassword = false;

                this.signOutAndRedirect();
            },
            error: (error) => {
                console.error('Lỗi đổi mật khẩu:', error);
            }
        });
    }

    private async signOutAndRedirect() {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }
}
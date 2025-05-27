import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
    getCurrentUser,
    updatePassword,
    fetchAuthSession,
    signOut
} from 'aws-amplify/auth';

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
    isLoading: boolean = false;
    errorMessage: string = '';
    showChangePassword: boolean = false;
    showDebug: boolean = false;
    debugInfo: any = {};
    isAuthenticated: boolean = false;

    constructor(private router: Router) {
        this.username = localStorage.getItem('username') || localStorage.getItem('email') || 'User';
        this.checkAuthStatus();
    }

    async checkAuthStatus() {
        try {
            await fetchAuthSession();
            this.isAuthenticated = true;
        } catch (error) {
            this.isAuthenticated = false;
            console.warn('User is not authenticated');
        }
    }

    toggleChangePassword() {
        if (!this.isAuthenticated) {
            this.errorMessage = 'Bạn cần đăng nhập để thực hiện thao tác này';
            this.router.navigate(['/login']);
            return;
        }

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
        // Kiểm tra xác thực trước khi tiếp tục
        try {
            const session = await fetchAuthSession();
            if (!session.tokens?.accessToken) {
                this.errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
                await this.signOutAndRedirect();
                return;
            }
        } catch (error) {
            this.errorMessage = 'Không thể kiểm tra phiên đăng nhập. Vui lòng đăng nhập lại.';
            await this.signOutAndRedirect();
            return;
        }

        // Validate form inputs
        if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
            this.errorMessage = 'Vui lòng điền đầy đủ thông tin!';
            return;
        }

        if (this.newPassword !== this.confirmPassword) {
            this.errorMessage = 'Mật khẩu mới không khớp!';
            return;
        }

        this.errorMessage = '';
        this.isLoading = true;

        try {
            // Gọi API updatePassword của Cognito
            await updatePassword({
                oldPassword: this.currentPassword,
                newPassword: this.newPassword
            });

            alert('Đổi mật khẩu thành công!');
            this.resetPasswordForm();
            this.showChangePassword = false;

        } catch (error: any) {
            console.error('Lỗi đổi mật khẩu:', error);

            if (error.name === 'NotAuthorizedException') {
                this.errorMessage = 'Mật khẩu hiện tại không đúng!';
            } else if (error.name === 'InvalidPasswordException') {
                this.errorMessage = 'Mật khẩu mới không hợp lệ!';
            } else if (error.name === 'UserUnAuthenticatedException') {
                this.errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
                await this.signOutAndRedirect();
            } else {
                this.errorMessage = error.message || 'Có lỗi xảy ra khi đổi mật khẩu!';
            }
        } finally {
            this.isLoading = false;
        }
    }

    private async signOutAndRedirect() {
        try {
            await signOut();
        } catch (e) {
            console.log('SignOut error:', e);
        }

        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }
}
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../../services/profile.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-edit-profile',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
    @Input() profileData: any;

    editField: string | null = null;
    editValue: string = '';
    @ViewChild('inputField') inputField?: ElementRef<HTMLInputElement>;
    private shouldFocus = false;

    startEdit(field: string) {
        this.editField = field;
        this.editValue = this.profileData[field];
        this.shouldFocus = true;
    }
    constructor(
        private profileService: ProfileService,
        private router: Router
    ) { }

    ngAfterViewChecked() {
        if (this.shouldFocus && this.inputField) {
            const inputEl = this.inputField.nativeElement;
            inputEl.focus();

            if (inputEl.type === 'text' || inputEl.tagName === 'TEXTAREA') {
                const len = inputEl.value.length;
                inputEl.setSelectionRange(len, len);
            }

            this.shouldFocus = false;
        }
    }

    cancelEdit() {
        this.editField = null;
    }

    async saveEdit() {
        if (!this.editField) return;

        const updatedData = { ...this.profileData };
        updatedData[this.editField] = this.editValue;

        try {
            const response = await firstValueFrom(
                this.profileService.editUserProfile(updatedData)
            );

            this.profileData = response.body;
            this.editField = null;

        } catch (error) {
            console.error('Lỗi khi cập nhật profile:', error);
        }
    }
}
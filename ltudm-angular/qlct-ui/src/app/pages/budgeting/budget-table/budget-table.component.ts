
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-table',
  imports: [FormsModule, CommonModule],
  templateUrl: './budget-table.component.html',
  styleUrl: './budget-table.component.css'
})
export class BudgetTableComponent {
  budgetItems = [
    { type: 'Ăn uống', total: '500.000đ', remaining: '200.000đ', deadline: '5 ngày', note: 'chi tiêu tháng 12' },
    { type: 'Điện nước', total: '400.000đ', remaining: '100.000đ', deadline: '5 ngày', note: 'chi tiêu tháng 12' },
    { type: 'Giải trí', total: '300.000đ', remaining: '150.000đ', deadline: '5 ngày', note: 'chi tiêu tháng 12' },
  ];

  showModal = false;
  selectedItem: any = null;
  selectedIndex: number | null = null;

  openModal(item: any, index: number) {
    this.selectedItem = { ...item }; // tạo bản sao để chỉnh sửa tạm
    this.selectedIndex = index;
    this.showModal = true;
  }

  saveEdit() {
    if (this.selectedIndex !== null) {
      this.budgetItems[this.selectedIndex] = { ...this.selectedItem };
    }
    this.closeModal();
  }

  deleteItem() {
    if (this.selectedIndex !== null) {
      this.budgetItems.splice(this.selectedIndex, 1);
    }
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.selectedItem = null;
    this.selectedIndex = null;
  }
}

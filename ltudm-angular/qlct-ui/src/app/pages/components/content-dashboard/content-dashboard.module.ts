import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content-dashboard.component';

@NgModule({
  imports: [CommonModule, ContentComponent],
  exports: [ContentComponent]
})
export class ContentModule { }

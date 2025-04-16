import { Component } from '@angular/core';
import { SettingComponent } from '../pages/setting/setting.component';

@Component({
  selector: 'app-shared',
  imports: [
    SettingComponent
  ],
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.css'
})
export class SharedComponent {

}

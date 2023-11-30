import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExIconComponent,
  ExLayoutComponent,
  ExLeafComponent,
  ExSizeComponent
} from '@ng-nest/ui/menu/examples';

@Component({
  selector: 'te-menu',
  standalone: true,
  imports: [ExDefaultComponent, ExIconComponent, ExLayoutComponent, ExLeafComponent, ExSizeComponent],
  templateUrl: './menu.component.html'
})
export class TeMenuComponent {}

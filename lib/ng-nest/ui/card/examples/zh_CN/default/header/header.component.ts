import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XCardComponent } from '@ng-nest/ui/card';

@Component({
  selector: 'ex-header',
  standalone: true,
  imports: [CommonModule, XCardComponent, XButtonComponent],
  templateUrl: './header.component.html'
})
export class ExHeaderComponent {
  list = [1, 2, 3, 4, 5, 6];
}

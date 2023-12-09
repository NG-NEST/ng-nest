import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XResultComponent } from '@ng-nest/ui/result';

@Component({
  selector: 'ex-info',
  standalone: true,
  imports: [CommonModule, XButtonComponent, XResultComponent],
  templateUrl: './info.component.html'
})
export class ExInfoComponent {}

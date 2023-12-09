import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XResultComponent } from '@ng-nest/ui/result';

@Component({
  selector: 'ex-img',
  standalone: true,
  imports: [CommonModule, XButtonComponent, XResultComponent],
  templateUrl: './img.component.html'
})
export class ExImgComponent {}

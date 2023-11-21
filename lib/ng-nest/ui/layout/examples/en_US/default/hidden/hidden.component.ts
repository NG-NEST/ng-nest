import { Component } from '@angular/core';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';

@Component({
  selector: 'ex-hidden',
  standalone: true,
  imports: [XRowComponent, XColComponent],
  templateUrl: './hidden.component.html',
  styleUrls: ['./hidden.component.scss']
})
export class ExHiddenComponent {}

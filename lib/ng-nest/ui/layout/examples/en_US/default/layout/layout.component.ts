import { Component } from '@angular/core';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';

@Component({
  selector: 'ex-layout',
  standalone: true,
  imports: [XRowComponent, XColComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class ExLayoutComponent {}

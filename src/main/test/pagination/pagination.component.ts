import { Component } from '@angular/core';
import { ExDefaultComponent, ExStyleComponent } from '@ng-nest/ui/pagination/examples';

@Component({
  selector: 'te-pagination',
  standalone: true,
  imports: [ExDefaultComponent, ExStyleComponent],
  templateUrl: './pagination.component.html'
})
export class TePaginationComponent {}

import { Component } from '@angular/core';
import { XProgressComponent } from '@ng-nest/ui/progress';

@Component({
  selector: 'ex-inside',
  imports: [XProgressComponent],
  templateUrl: './inside.component.html',
  styleUrls: ['./inside.component.scss']
})
export class ExInsideComponent {}

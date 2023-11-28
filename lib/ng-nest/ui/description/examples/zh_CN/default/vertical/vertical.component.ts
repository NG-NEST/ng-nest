import { Component } from '@angular/core';
import { XDescriptionComponent, XDescriptionItemComponent } from '@ng-nest/ui/description';

@Component({
  selector: 'ex-vertical',
  standalone: true,
  imports: [XDescriptionComponent, XDescriptionItemComponent],
  templateUrl: './vertical.component.html'
})
export class ExVerticalComponent {}

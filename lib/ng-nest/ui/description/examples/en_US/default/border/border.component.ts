import { Component } from '@angular/core';
import { XDescriptionComponent, XDescriptionItemComponent } from '@ng-nest/ui/description';

@Component({
  selector: 'ex-border',
  imports: [XDescriptionComponent, XDescriptionItemComponent],
  templateUrl: './border.component.html'
})
export class ExBorderComponent {}

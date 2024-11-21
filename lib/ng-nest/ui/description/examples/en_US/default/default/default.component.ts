import { Component } from '@angular/core';
import { XDescriptionComponent, XDescriptionItemComponent } from '@ng-nest/ui/description';

@Component({
  selector: 'ex-default',
  imports: [XDescriptionComponent, XDescriptionItemComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {}

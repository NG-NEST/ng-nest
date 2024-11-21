import { Component } from '@angular/core';
import { XDescriptionComponent, XDescriptionItemComponent } from '@ng-nest/ui/description';

@Component({
  selector: 'ex-split',
  imports: [XDescriptionComponent, XDescriptionItemComponent],
  templateUrl: './split.component.html'
})
export class ExSplitComponent {}

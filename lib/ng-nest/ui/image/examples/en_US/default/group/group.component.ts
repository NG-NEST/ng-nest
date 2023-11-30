import { Component } from '@angular/core';
import { XImageComponent, XImageGroupComponent } from '@ng-nest/ui/image';

@Component({
  selector: 'ex-group',
  standalone: true,
  imports: [XImageComponent, XImageGroupComponent],
  templateUrl: './group.component.html'
})
export class ExGroupComponent {}

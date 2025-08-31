import { Component } from '@angular/core';
import { XTableViewModule } from '@ng-nest/ui/table-view';
import { XScrollableComponent } from "@ng-nest/ui/scrollable/scrollable.component";

@Component({
  selector: 'ex-default',
  imports: [XTableViewModule, XScrollableComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class ExDefaultComponent {

}

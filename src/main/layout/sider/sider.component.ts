import { Component, ViewEncapsulation, inject } from '@angular/core';
import { LayoutService } from '../layout.service';
import { XMenuComponent } from '@ng-nest/ui/menu';

@Component({
  selector: 'ns-sider',
  standalone: true,
  imports: [XMenuComponent],
  templateUrl: './sider.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SiderComponent {
  layout = inject(LayoutService);
}

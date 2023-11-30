import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XImageComponent } from '@ng-nest/ui/image';

@Component({
  selector: 'ex-placeholder',
  standalone: true,
  imports: [XButtonComponent, XImageComponent],
  templateUrl: './placeholder.component.html'
})
export class ExPlaceholderComponent {
  src = 'https://ngnest.com/static/docs/course/rbac/1-introduction/demo/1__ng-nest-admin/light.png';

  onRefresh() {
    this.src = `${this.src}?${new Date().getTime()}`;
  }
}

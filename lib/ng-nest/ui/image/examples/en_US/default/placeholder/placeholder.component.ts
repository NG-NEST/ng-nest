import { Component } from '@angular/core';

@Component({
  selector: 'ex-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss']
})
export class ExPlaceholderComponent {
  src = 'https://ngnest.com/static/docs/course/rbac/1-introduction/demo/1__ng-nest-admin/light.png';

  onRefresh() {
    this.src = `${this.src}?${new Date().getTime()}`;
  }
}

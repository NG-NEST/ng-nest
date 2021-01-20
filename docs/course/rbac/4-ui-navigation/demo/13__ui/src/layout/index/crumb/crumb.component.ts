import { Component, ViewEncapsulation } from '@angular/core';
import { IndexService } from '../index.service';

@Component({
  selector: 'app-crumb',
  templateUrl: './crumb.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CrumbComponent {
  constructor(public index: IndexService) {}
}

import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDrawerComponent } from '@ng-nest/ui/drawer';

@Component({
  selector: 'ex-title',
  standalone: true,
  imports: [XButtonComponent, XDrawerComponent],
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class ExTitleComponent {
  visible!: boolean;

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}

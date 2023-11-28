import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDrawerComponent } from '@ng-nest/ui/drawer';

@Component({
  selector: 'ex-title',
  standalone: true,
  imports: [CommonModule, XButtonComponent, XDrawerComponent],
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

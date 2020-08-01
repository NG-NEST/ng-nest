import { Component } from '@angular/core';

@Component({
  selector: 'ex-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class ExCloseComponent {
  tags = ['Label One', 'Label Two', 'Label Three', 'Label Four', 'Label Five'];
  close(tag: string) {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }
}

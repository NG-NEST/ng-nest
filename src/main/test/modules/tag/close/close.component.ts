import { Component } from '@angular/core';

@Component({
  selector: 'ex-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class ExCloseComponent {
  tags = ['标签一', '标签二', '标签三', '标签四', '标签五'];
  close(tag: string) {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }

  add() {
    this.tags.push('标签一')
  }
}

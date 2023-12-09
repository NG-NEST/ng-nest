import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XTagComponent } from '@ng-nest/ui/tag';

@Component({
  selector: 'ex-close',
  standalone: true,
  imports: [CommonModule, XTagComponent],
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class ExCloseComponent {
  tags = ['标签一', '标签二', '标签三', '标签四', '标签五'];
  close(tag: string) {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }
}

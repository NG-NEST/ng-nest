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
  tags = ['Label One', 'Label Two', 'Label Three', 'Label Four', 'Label Five'];
  close(tag: string) {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }
}

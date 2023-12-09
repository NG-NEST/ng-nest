import { Component } from '@angular/core';
import { XTreeFileComponent, XTreeFileNode } from '@ng-nest/ui/tree-file';

@Component({
  selector: 'ex-content',
  standalone: true,
  imports: [XTreeFileComponent],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ExContentComponent {
  data: XTreeFileNode[] = [
    { id: 'test1', label: 'test1', content: 'content1 content1 content1' },
    { id: 'test2', label: 'test2', content: 'content2 content2 content2' },
    { id: 'test3', label: 'test3', content: 'content3 content3 content3' }
  ];
}

import { Component } from '@angular/core';
import { XStepsComponent } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-description',
  standalone: true,
  imports: [XStepsComponent],
  templateUrl: './description.component.html'
})
export class ExDescriptionComponent {
  data = [
    { label: '完成', description: '这是描述内容。' },
    { label: '进行中', description: '这是描述内容。' },
    { label: '等待', description: '这是描述内容。' }
  ];
}

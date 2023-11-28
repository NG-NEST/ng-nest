import { Component } from '@angular/core';
import { ExDefaultComponent } from '@ng-nest/ui/comment/examples';

@Component({
  selector: 'te-comment',
  standalone: true,
  imports: [ExDefaultComponent],
  templateUrl: './comment.component.html'
})
export class TeCommentComponent {}

import { Component } from '@angular/core';

@Component({
  selector: 'ex-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class ExDescriptionComponent {
  content = `The more you learn, the more you don't know.`;
}

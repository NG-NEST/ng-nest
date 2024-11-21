import { Component } from '@angular/core';
import {
  ExCopyComponent,
  ExHtmlComponent,
  ExScssComponent,
  ExTypescriptComponent
} from '@ng-nest/ui/highlight/examples';

@Component({
  selector: 'te-highlight',
  imports: [ExCopyComponent, ExHtmlComponent, ExScssComponent, ExTypescriptComponent],
  templateUrl: './highlight.component.html'
})
export class TeHighlightComponent {}

import { Component } from '@angular/core';
import { XAlertComponent } from '@ng-nest/ui/alert';
import { XBubbleComponent } from '@ng-nest/ui/bubble';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XImageComponent } from '@ng-nest/ui/image';
import { XResultComponent } from '@ng-nest/ui/result';

@Component({
  selector: 'ex-template',
  imports: [XBubbleComponent, XButtonComponent, XImageComponent, XAlertComponent, XResultComponent],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class ExTemplateComponent {}

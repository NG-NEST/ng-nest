import { Component } from '@angular/core';
import { XSplitterComponent, XSplitterPanelComponent, XSplitterBarComponent } from '@ng-nest/ui/splitter';

@Component({
  selector: 'ex-default',
  imports: [XSplitterComponent, XSplitterPanelComponent, XSplitterBarComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}

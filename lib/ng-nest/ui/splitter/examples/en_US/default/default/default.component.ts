import { Component } from '@angular/core';
import { XSplitterComponent, XSplitterPanelComponent } from '@ng-nest/ui/splitter';

@Component({
  selector: 'ex-default',
  imports: [XSplitterComponent, XSplitterPanelComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}

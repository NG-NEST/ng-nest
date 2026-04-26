import { Component } from '@angular/core';
import { XSplitterComponent, XSplitterPanelComponent, XSplitterBarComponent } from '@ng-nest/ui/splitter';

@Component({
  selector: 'ex-fixed-size',
  imports: [XSplitterComponent, XSplitterPanelComponent, XSplitterBarComponent],
  templateUrl: './fixed-size.component.html',
  styleUrls: ['./fixed-size.component.scss']
})
export class ExFixedSizeComponent {}

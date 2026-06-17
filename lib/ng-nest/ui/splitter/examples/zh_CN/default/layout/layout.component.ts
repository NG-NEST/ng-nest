import { Component } from '@angular/core';
import { XSplitterComponent, XSplitterPanelComponent, XSplitterBarComponent } from '@ng-nest/ui/splitter';

@Component({
  selector: 'ex-layout',
  imports: [XSplitterComponent, XSplitterPanelComponent, XSplitterBarComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class ExLayoutComponent {}

import { NgModule } from '@angular/core';
import { XSplitterComponent } from './splitter.component';
import { XSplitterPanelComponent } from './splitter-panel.component';
import { XSplitterBarComponent } from './splitter-bar.component';

@NgModule({
  imports: [XSplitterComponent, XSplitterPanelComponent, XSplitterBarComponent],
  exports: [XSplitterComponent, XSplitterPanelComponent, XSplitterBarComponent]
})
export class XSplitterModule {}

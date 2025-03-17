import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExAdaptionComponent,
  ExBorderedComponent,
  ExCheckboxComponent,
  ExConfigComponent,
  ExCustomComponent,
  ExDragColumnComponent,
  ExDragWidthComponent,
  ExEditComponent,
  ExExpandComponent,
  ExFixComponent,
  ExHeadComponent,
  ExHeaderComponent,
  ExRowSizeComponent,
  ExRowclassComponent,
  ExScrollComponent,
  ExSearchComponent,
  ExHeadTemplateComponent,
  ExInnerHTMLComponent
} from '@ng-nest/ui/table/examples';

@Component({
  selector: 'te-table',
  imports: [
    ExDefaultComponent,
    ExAdaptionComponent,
    ExBorderedComponent,
    ExCheckboxComponent,
    ExConfigComponent,
    ExCustomComponent,
    ExDragColumnComponent,
    ExDragWidthComponent,
    ExEditComponent,
    ExExpandComponent,
    ExFixComponent,
    ExHeadComponent,
    ExHeaderComponent,
    ExRowSizeComponent,
    ExRowclassComponent,
    ExScrollComponent,
    ExSearchComponent,
    ExHeadTemplateComponent,
    ExInnerHTMLComponent
  ],
  templateUrl: './table.component.html'
})
export class TeTableComponent {}

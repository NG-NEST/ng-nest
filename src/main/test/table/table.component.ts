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
  ExHeadTemplateComponent
} from '@ng-nest/ui/table/examples';

@Component({
  selector: 'te-table',
  standalone: true,
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
    ExHeadTemplateComponent
  ],
  templateUrl: './table.component.html'
})
export class TeTableComponent {}

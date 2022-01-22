import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XColorPickerComponent } from './color-picker.component';
import { XColorPickerPortalComponent } from './color-picker-portal.component';
import { XInputModule } from '@ng-nest/ui/input';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XSliderSelectModule } from '@ng-nest/ui/slider-select';
import { XTabsModule } from '@ng-nest/ui/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { XColorPickerProperty } from './color-picker.property';
import { XBaseFormModule } from '@ng-nest/ui/base-form';

@NgModule({
    declarations: [XColorPickerComponent, XColorPickerPortalComponent, XColorPickerProperty],
    exports: [XColorPickerComponent, XColorPickerPortalComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DragDropModule,
        XPortalModule,
        XSliderSelectModule,
        XTabsModule,
        XInputModule,
        XBaseFormModule
    ]
})
export class XColorPickerModule {}

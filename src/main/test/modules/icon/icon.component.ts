import { Component } from '@angular/core';
import { ExAntDesignComponent } from './ant-design/ant-design.component';
import { ExEvaComponent } from './eva/eva.component';
import { ExFeatherComponent } from './feather/feather.component';
import { ExFontAwesomeComponent } from './font-awesome/font-awesome.component';
import { ExMaterialDesignComponent } from './material-design/material-design.component';

@Component({
  selector: 'te-icon',
  standalone: true,
  imports: [
    ExAntDesignComponent,
    ExEvaComponent,
    ExFeatherComponent,
    ExFontAwesomeComponent,
    ExMaterialDesignComponent
  ],
  templateUrl: './icon.component.html'
})
export class TeIconComponent {}

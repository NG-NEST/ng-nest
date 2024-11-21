import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { XLoadingComponent } from '@ng-nest/ui/loading';

@Component({
  selector: 'ex-default',
  imports: [NgTemplateOutlet, XLoadingComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}

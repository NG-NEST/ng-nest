import { Component } from '@angular/core';
import { TypesService } from '@services';

@Component({
  selector: 'ns-api',
  imports: [],
  templateUrl: './api.component.html',
  styleUrl: './api.component.scss'
})
export class NsApiComponent {
  constructor(public types: TypesService) {}
}

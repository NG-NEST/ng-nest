import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XRateComponent } from '@ng-nest/ui/rate';

@Component({
  selector: 'ex-disabled',
  standalone: true,
  imports: [FormsModule, XRateComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent implements OnInit {
  model = 3;
  constructor() {}

  ngOnInit() {}
}

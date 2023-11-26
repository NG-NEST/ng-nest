import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { XCarouselComponent, XCarouselPanelComponent } from '@ng-nest/ui/carousel';

@Component({
  selector: 'ex-arrow',
  standalone: true,
  imports: [CommonModule, XCarouselComponent, XCarouselPanelComponent],
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.scss']
})
export class ExArrowComponent implements OnInit {
  list = [1, 2, 3, 4, 5];
  constructor() {}

  ngOnInit() {}
}

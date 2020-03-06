import { Component, OnInit } from '@angular/core';
import { XCascadeNode } from '@ng-nest/ui/cascade';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class ExLabelComponent implements OnInit {
  model: number;
  data: XData<XCascadeNode[]> = [
    { value: 1, label: 'AAAA' },
    { value: 2, label: 'BBBB' },
    { value: 3, label: 'CCCC' },
    { value: 4, label: 'DDDD' },
    { value: 5, label: 'AAAA-1', pid: 1 },
    { value: 6, label: 'AAAA-2', pid: 1 },
    { value: 7, label: 'AAAA-3', pid: 1 },
    { value: 8, label: 'AAAA-4', pid: 1 },
    { value: 9, label: 'BBBB-1', pid: 2 },
    { value: 10, label: 'BBBB-2', pid: 2 },
    { value: 11, label: 'BBBB-3', pid: 2 },
    { value: 12, label: 'BBBB-4', pid: 2 },
    { value: 13, label: 'CCCC-1', pid: 3 },
    { value: 14, label: 'CCCC-2', pid: 3 },
    { value: 15, label: 'CCCC-3', pid: 3 },
    { value: 16, label: 'CCCC-4', pid: 3 },
    { value: 17, label: 'DDDD-1', pid: 4 },
    { value: 18, label: 'DDDD-2', pid: 4 },
    { value: 19, label: 'DDDD-3', pid: 4 },
    { value: 20, label: 'DDDD-4', pid: 4 },
    { value: 21, label: 'AAAA-1-1', pid: 5 },
    { value: 22, label: 'AAAA-1-2', pid: 5 },
    { value: 23, label: 'AAAA-1-3', pid: 5 },
    { value: 24, label: 'AAAA-1-4', pid: 5 },
    { value: 25, label: 'AAAA-2-1', pid: 6 },
    { value: 26, label: 'AAAA-2-2', pid: 6 },
    { value: 27, label: 'AAAA-2-3', pid: 6 },
    { value: 28, label: 'AAAA-2-4', pid: 6 },
    { value: 29, label: 'AAAA-3-1', pid: 7 },
    { value: 30, label: 'AAAA-3-2', pid: 7 },
    { value: 31, label: 'AAAA-3-3', pid: 7 },
    { value: 32, label: 'AAAA-3-4', pid: 7 },
    { value: 33, label: 'AAAA-4-1', pid: 8 },
    { value: 34, label: 'AAAA-4-2', pid: 8 },
    { value: 35, label: 'AAAA-4-3', pid: 8 },
    { value: 36, label: 'AAAA-4-4', pid: 8 }
  ];
  constructor() {}

  ngOnInit() {}
}

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
    { id: 1, label: 'AAAA' },
    { id: 2, label: 'BBBB' },
    { id: 3, label: 'CCCC' },
    { id: 4, label: 'DDDD' },
    { id: 5, label: 'AAAA-1', pid: 1 },
    { id: 6, label: 'AAAA-2', pid: 1 },
    { id: 7, label: 'AAAA-3', pid: 1 },
    { id: 8, label: 'AAAA-4', pid: 1 },
    { id: 9, label: 'BBBB-1', pid: 2 },
    { id: 10, label: 'BBBB-2', pid: 2 },
    { id: 11, label: 'BBBB-3', pid: 2 },
    { id: 12, label: 'BBBB-4', pid: 2 },
    { id: 13, label: 'CCCC-1', pid: 3 },
    { id: 14, label: 'CCCC-2', pid: 3 },
    { id: 15, label: 'CCCC-3', pid: 3 },
    { id: 16, label: 'CCCC-4', pid: 3 },
    { id: 17, label: 'DDDD-1', pid: 4 },
    { id: 18, label: 'DDDD-2', pid: 4 },
    { id: 19, label: 'DDDD-3', pid: 4 },
    { id: 20, label: 'DDDD-4', pid: 4 },
    { id: 21, label: 'AAAA-1-1', pid: 5 },
    { id: 22, label: 'AAAA-1-2', pid: 5 },
    { id: 23, label: 'AAAA-1-3', pid: 5 },
    { id: 24, label: 'AAAA-1-4', pid: 5 },
    { id: 25, label: 'AAAA-2-1', pid: 6 },
    { id: 26, label: 'AAAA-2-2', pid: 6 },
    { id: 27, label: 'AAAA-2-3', pid: 6 },
    { id: 28, label: 'AAAA-2-4', pid: 6 },
    { id: 29, label: 'AAAA-3-1', pid: 7 },
    { id: 30, label: 'AAAA-3-2', pid: 7 },
    { id: 31, label: 'AAAA-3-3', pid: 7 },
    { id: 32, label: 'AAAA-3-4', pid: 7 },
    { id: 33, label: 'AAAA-4-1', pid: 8 },
    { id: 34, label: 'AAAA-4-2', pid: 8 },
    { id: 35, label: 'AAAA-4-3', pid: 8 },
    { id: 36, label: 'AAAA-4-4', pid: 8 }
  ];
  constructor() {}

  ngOnInit() {}
}

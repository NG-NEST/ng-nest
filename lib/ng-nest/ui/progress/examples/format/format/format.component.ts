import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ex-format',
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.scss']
})
export class ExFormatComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  format(percent) {
    return percent === 100 ? '已完成' : '加载中' + percent + '%';
  }
}

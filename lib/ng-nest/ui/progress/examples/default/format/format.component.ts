import { Component } from '@angular/core';

@Component({
  selector: 'ex-format',
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.scss']
})
export class ExFormatComponent {
  format(percent: number) {
    return percent === 100 ? '已完成' : '加载中' + percent + '%';
  }
}

import { Component } from '@angular/core';
// import { interval } from 'rxjs';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  list = [
    '1文字信息阿斯顿阿现实的安慰请问撒旦啊是的请问',
    '2文字信息阿斯顿阿现实的安慰请问撒旦啊是的请问',
    '3文字信息阿斯顿阿现实的安慰请问撒旦啊是的请问',
    '4文字信息阿斯顿阿现实的安慰请问撒旦啊是的请问',
    '5文字信息阿斯顿阿现实的安慰请问撒旦啊是的请问'
  ];

  text = '1文字信息阿斯顿阿现实的安慰请问撒旦啊是的请问';

  ngOnInit() {
    // interval(2000).subscribe(() => {
    //   this.list = [7, 8, 9, 10];
    // });
  }

  activeChange(index: number) {
    this.text = this.list[index];
  }
}

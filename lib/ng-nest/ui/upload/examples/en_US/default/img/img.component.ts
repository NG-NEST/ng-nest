import { Component } from '@angular/core';

@Component({
  selector: 'ex-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ExImgComponent {
  imgs = [
    { url: 'https://ngnest.com/static/docs/course/rbac/1-introduction/demo/1__ng-nest-admin/light.png', name: 'Bright style' },
    {
      url: 'https://ngnest.com/static/docs/course/rbac/1-introduction/demo/1__ng-nest-admin/dark.png',
      name: 'Dark style'
    },
    { url: 'error', name: 'Wrong address' }
  ];
}

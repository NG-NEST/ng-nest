import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent implements OnInit {
  src = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
  constructor() {}

  ngOnInit() {}
}

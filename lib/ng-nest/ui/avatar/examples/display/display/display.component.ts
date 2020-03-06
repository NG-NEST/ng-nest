import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ex-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class ExDisplayComponent implements OnInit {
  src = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
  icon = 'fto-user';
  label = '王';
  constructor() {}

  ngOnInit() {}
}

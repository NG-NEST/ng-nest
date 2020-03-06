import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ns-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewsComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
}

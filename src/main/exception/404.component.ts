import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleReuseStrategy } from '../simple-reuse-srategy';

@Component({
  selector: 'exception-404',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Exception404Component {
  constructor(private router: Router) {
    SimpleReuseStrategy.deleteRouteSnapshot(this.router.url);
  }
  back() {
    window.history.back();
  }
}

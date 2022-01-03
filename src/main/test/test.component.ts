import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XMenuNode } from '@ng-nest/ui/menu';
import { menus } from 'src/environments/menus';
import { Menu } from 'src/environments/routes';

@Component({
  selector: 'ns-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestComponent implements OnInit {
  constructor(private router: Router, private ac: ActivatedRoute) {}
  ngOnInit() {}

  data = menus.filter((x) => x.lang === 'zh_CN');

  nodeClick(node: XMenuNode | Menu) {
    this.router.navigate([`./${(node as Menu).name}`], { relativeTo: this.ac });
  }
}

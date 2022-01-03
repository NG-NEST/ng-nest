import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfigService } from 'src/services/config.service';
import { environment } from 'src/environments/environment.prod';
import { LayoutService } from '../layout/layout.service';
import { Menu } from 'src/environments/routes';

@Component({
  selector: 'ns-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NsDocsComponent {
  constructor(
    public layout: LayoutService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private config: ConfigService,
    private location: Location
  ) {
    this.redirectTo();
  }

  redirectTo() {
    const path = this.location.path();
    if (path === `/${environment.layout}/docs`) {
      this.router.navigate([`./${this.config.lang}`], { relativeTo: this.activatedRoute });
    }
  }

  nodeClick(menu: Menu) {
    if (menu.type === 'router') return;
    let router = menu.router as string;
    if (router.startsWith('docs/')) {
      router = router.replace('docs/', '');
    }
    this.router.navigate([router], { relativeTo: this.activatedRoute });
    this.layout.defaultActivatedId = menu.id;
  }
}

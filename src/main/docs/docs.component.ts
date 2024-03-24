import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
import { ConfigService } from '../../services/config.service';
import { LayoutService } from '../layout/layout.service';
import { environment } from '@environments';
import { AppMenu } from '@interfaces';
import { NsAdaptionDirective } from '@share';
import { XMenuComponent } from '@ng-nest/ui/menu';

@Component({
  selector: 'ns-docs',
  standalone: true,
  imports: [RouterOutlet, NsAdaptionDirective, XMenuComponent],
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

  nodeClick(menu: AppMenu) {
    if (menu.type === 'router') return;
    let router = menu.routerLink as string;
    if (router.startsWith('docs/')) {
      router = router.replace('docs/', '');
    }
    this.router.navigate([router], { relativeTo: this.activatedRoute });
    this.layout.defaultActivatedId = menu.id;
  }
}

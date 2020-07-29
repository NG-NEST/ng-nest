import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfigService } from 'src/services/config.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'ns-docs',
  templateUrl: './docs.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NsDocsComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private config: ConfigService, private location: Location) {
    this.redirectTo();
  }

  redirectTo() {
    const path = this.location.path();
    if (path === `/${environment.layout}/docs`) {
      this.router.navigate([`./${this.config.lang}`], { relativeTo: this.activatedRoute });
    }
  }
}

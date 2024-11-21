import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XMenuNode } from '@ng-nest/ui/menu';
import { ConfigService } from '@services';
import { Observable } from 'rxjs';
import { LayoutService } from '../layout.service';
import { AppMenu } from '@interfaces';
import { debounceTime } from 'rxjs/operators';
import { XAutoCompleteComponent } from '@ng-nest/ui/auto-complete';
import { XI18nPipe } from '@ng-nest/ui/i18n';

@Component({
  selector: 'ns-search',
  imports: [XAutoCompleteComponent, XI18nPipe],
  templateUrl: './search.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent {
  layout = inject(LayoutService);
  config = inject(ConfigService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  getSearchData = signal((str: string) =>
    new Observable<XMenuNode[]>((x) => {
      let result = this.layout
        .menusLang()
        [this.config.lang].filter((y) => y.label && y.label.toLocaleUpperCase().indexOf(str.toLocaleUpperCase()) > -1)
        .map((y) => ({ ...y, label: y.label, id: y.label }));
      x.next(result);
      x.complete();
    }).pipe(debounceTime(200))
  );

  pagaTo(menu: AppMenu) {
    this.router.navigate([menu.routerLink], { relativeTo: this.activatedRoute });
  }
}

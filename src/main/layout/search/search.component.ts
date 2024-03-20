import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XMenuNode } from '@ng-nest/ui/menu';
import { XConfigService } from '@ng-nest/ui/core';
import { ConfigService } from '@services/config.service';
import { Observable } from 'rxjs';
import { LayoutService } from '../layout.service';
import { Menu } from '@interfaces';
import { debounceTime } from 'rxjs/operators';
import { XAutoCompleteComponent } from '@ng-nest/ui/auto-complete';
import { XI18nPipe } from '@ng-nest/ui/i18n';

@Component({
  selector: 'ns-search',
  standalone: true,
  imports: [XAutoCompleteComponent, XI18nPipe],
  templateUrl: './search.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent {
  getSearchData = (str: string) =>
    new Observable<XMenuNode[]>((x) => {
      let result = this.layout.menusLang[this.config.lang]
        .filter((y) => y.label && y.label.toLocaleUpperCase().indexOf(str.toLocaleUpperCase()) > -1)
        .map((y) => ({ ...y, label: y.label, id: y.label }));
      x.next(result);
      x.complete();
    }).pipe(debounceTime(200));
  constructor(
    public layout: LayoutService,
    public xconfig: XConfigService,
    public config: ConfigService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public cdr: ChangeDetectorRef
  ) {}

  pagaTo(menu: Menu) {
    this.router.navigate([menu.routerLink], { relativeTo: this.activatedRoute });
  }
}

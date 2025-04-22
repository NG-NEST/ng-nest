import { Injectable } from '@angular/core';
import { XIconService } from '@ng-nest/ui/icon';

@Injectable({ providedIn: 'root' })
export class IconService {
  constructor(private iconService: XIconService) {}

  init() {
    this.iconService.register('my-home', '/svg/home.svg');
  }
}

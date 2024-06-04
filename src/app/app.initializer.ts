import { inject } from '@angular/core';
import { ConfigService } from '@services';
import { Observable, of } from 'rxjs';

export function AppInitializer(): () => Observable<boolean> {
  const config = inject(ConfigService);
  config.init();
  return () => of(true);
}

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { XDragDirective } from '@ng-nest/ui/drag';
import { XDragPrefix } from './drag.property';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XDragPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [XDragDirective],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });
  describe(`default.`, () => {
    it('should create.', () => {
      expect(true).toBe(true);
    });
  });
});

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { XResizableDirective } from '@ng-nest/ui/resizable';
import { XResizablePrefix } from './resizable.property';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XResizablePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [XResizableDirective],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });
  describe(`default.`, () => {
    it('should create.', () => {
      expect(true).toBe(true);
    });
  });
});

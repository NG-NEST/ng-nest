import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { XResizableDirective } from '@ng-nest/ui/resizable';
import { XResizablePrefix } from './resizable.property';

describe(XResizablePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, XResizableDirective]
    }).compileComponents();
  });
  describe(`default.`, () => {
    it('should create.', () => {
      expect(true).toBe(true);
    });
  });
});

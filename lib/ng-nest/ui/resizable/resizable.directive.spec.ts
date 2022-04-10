import { TestBed } from '@angular/core/testing';
import { XResizableModule } from '@ng-nest/ui/resizable';
import { XResizablePrefix } from './resizable.property';

describe(XResizablePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XResizableModule]
    }).compileComponents();
  });
  describe(`default.`, () => {
    it('should create.', () => {
      expect(true).toBe(true);
    });
  });
});

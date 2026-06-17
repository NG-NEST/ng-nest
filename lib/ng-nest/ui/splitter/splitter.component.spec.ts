import { ComponentFixture, TestBed } from '@angular/core/testing';
import { XSplitterComponent } from './splitter.component';
import { XSplitterPanelComponent } from './splitter-panel.component';
import { XSplitterBarComponent } from './splitter-bar.component';

describe('XSplitterComponent', () => {
  let component: XSplitterComponent;
  let fixture: ComponentFixture<XSplitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XSplitterComponent, XSplitterPanelComponent, XSplitterBarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(XSplitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have horizontal direction by default', () => {
    expect(component.direction()).toBe('horizontal');
  });

  it('should apply correct class based on direction', () => {
    fixture.detectChanges();
    const splitterElement = fixture.nativeElement.querySelector('.x-splitter');
    expect(splitterElement.classList.contains('x-splitter-horizontal')).toBe(true);
  });
});

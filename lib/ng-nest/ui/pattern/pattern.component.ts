import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  inject,
  OnInit
} from '@angular/core';
import { PatternPrefix } from './pattern.property';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'x-pattern',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pattern.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPatternComponent implements OnInit {
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, PatternPrefix);
  }
}

import { OnChanges, OnInit, OnDestroy, AfterViewInit, SimpleChanges } from '@angular/core';

export abstract class XPortalDirective implements OnChanges, OnInit, OnDestroy, AfterViewInit {
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {}
  ngOnDestroy(): void {}
  ngAfterViewInit(): void {}
}

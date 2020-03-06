import {
  Directive,
  TemplateRef,
  Input,
  ViewContainerRef,
  SimpleChanges,
  EmbeddedViewRef,
  OnChanges,
  SimpleChange
} from '@angular/core';

@Directive({ selector: '[xOutlet]' })
export class XOutletDirective implements OnChanges {
  @Input() xOutletContext;
  @Input() xOutlet: any | TemplateRef<any>;
  private embeddedViewRef?: EmbeddedViewRef<any>;
  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) {}

  ngOnChanges(changes: SimpleChanges): void {
    const shouldRecreateView = (ctxChanges: SimpleChanges): boolean => {
      const { xOutletContext, xOutlet } = ctxChanges;
      let shouldOutletRecreate = false;
      if (xOutlet) {
        if (xOutlet.firstChange) {
          shouldOutletRecreate = true;
        } else {
          const isPreviousOutlet = xOutlet.previousValue instanceof TemplateRef;
          const isCurrentOutlet = xOutlet.currentValue instanceof TemplateRef;
          shouldOutletRecreate = isPreviousOutlet || isCurrentOutlet;
        }
      }
      const hasContextShapeChanged = (ctxChange: SimpleChange): boolean => {
        const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
        const currCtxKeys = Object.keys(ctxChange.currentValue || {});
        if (prevCtxKeys.length === currCtxKeys.length) {
          for (const propName of currCtxKeys) {
            if (prevCtxKeys.indexOf(propName) === -1) {
              return true;
            }
          }
          return false;
        } else {
          return true;
        }
      };
      const shouldContextRecreate = xOutletContext && hasContextShapeChanged(xOutletContext);
      return shouldContextRecreate || shouldOutletRecreate;
    };
    const recreateView = shouldRecreateView(changes);
    if (recreateView) {
      this.recreateView();
    } else {
      this.updateContext();
    }
  }

  private recreateView(): void {
    this.viewContainer.clear();
    const isTemplateRef = this.xOutlet instanceof TemplateRef;
    const templateRef = isTemplateRef ? this.xOutlet : this.templateRef;
    this.embeddedViewRef = this.viewContainer.createEmbeddedView(templateRef, this.xOutletContext);
  }

  private updateContext(): void {
    const newCtx = this.xOutletContext;
    const oldCtx = this.embeddedViewRef!.context;
    if (newCtx) {
      for (const propName of Object.keys(newCtx)) {
        oldCtx[propName] = newCtx[propName];
      }
    }
  }
}

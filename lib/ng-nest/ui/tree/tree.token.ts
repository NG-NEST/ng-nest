import {
  InjectionToken,
  InputSignal,
  InputSignalWithTransform,
  ModelSignal,
  OutputEmitterRef,
  TemplateRef,
  WritableSignal
} from '@angular/core';
import type { XTreeNode } from './tree.property';
import type { XBoolean, XNumber } from '@ng-nest/ui/core';

export interface XTreeContext {
  nodes: WritableSignal<XTreeNode[]>;
  dragging: WritableSignal<boolean>;
  hoverTreeNode: WritableSignal<XTreeNode | null>;
  spacing: InputSignalWithTransform<string, XNumber>;
  dragPosition: WritableSignal<-1 | 0 | 1>;
  activatedId: ModelSignal<any>;
  multiple: InputSignalWithTransform<boolean, XBoolean>;
  objectArray: InputSignalWithTransform<boolean, XBoolean>;
  levelCheck: InputSignalWithTransform<boolean, XBoolean>;
  activatedNode: WritableSignal<XTreeNode | null>;
  nodeOpen: InputSignalWithTransform<boolean, XBoolean>;
  onlyLeaf: InputSignalWithTransform<boolean, XBoolean>;
  includeChildren: InputSignalWithTransform<boolean, XBoolean>;
  activatedChange: OutputEmitterRef<XTreeNode>;
  nodeClick: OutputEmitterRef<XTreeNode>;
  checkboxChange: OutputEmitterRef<XTreeNode>;
  allowManyActivated: InputSignalWithTransform<boolean, XBoolean>;
  showLine: InputSignalWithTransform<boolean, XBoolean>;
  expandedIcon: InputSignal<TemplateRef<void> | undefined>;
  checkbox: InputSignalWithTransform<boolean, XBoolean>;
  labelTpl: InputSignal<TemplateRef<void> | undefined>;
  keywordText: InputSignal<string | string[] | undefined>;
  caseSensitive: InputSignalWithTransform<boolean, XBoolean>;
}

export const X_TREE_CONTEXT = new InjectionToken<XTreeContext>('X_TREE_CONTEXT');

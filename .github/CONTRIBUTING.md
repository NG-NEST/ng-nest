# NG-NEST 开发规范

> 本规范基于项目现有代码风格总结，后续开发必须严格遵守。如有未覆盖场景，请先讨论确认后补充到此文档。

---

## 1. 项目架构

### 1.1 技术栈
- **框架**: Angular 21+
- **语言**: TypeScript 5.9+（严格模式）
- **样式**: SCSS + CSS 变量
- **状态管理**: Signal（信号）
- **变更检测**: Zoneless + OnPush

### 1.2 目录结构
```
├── lib/ng-nest/ui/          # 组件库源码
│   └── [component]/         # 组件目录
│       ├── index.ts         # 模块导出
│       ├── public-api.ts    # 公共 API
│       ├── [name].component.ts
│       ├── [name].component.html
│       ├── [name].component.scss
│       ├── [name].component.spec.ts
│       ├── [name].property.ts
│       └── [name].module.ts
├── src/                     # 应用源码
│   ├── app/                 # 应用组件
│   ├── main/                # 页面模块
│   ├── services/            # 服务
│   ├── interfaces/          # 接口定义
│   └── utils/               # 工具函数
└── public/                  # 静态资源
```

---

## 2. 命名规范

### 2.1 组件命名
| 类型 | 格式 | 示例 |
|------|------|------|
| 选择器 | `x-[name]` | `x-button`, `x-date-picker` |
| 组件类 | `X[Name]Component` | `XButtonComponent` |
| 属性类 | `X[Name]Property` | `XButtonProperty` |
| 模块类 | `X[Name]Module` | `XButtonModule` |
| 前缀常量 | `X[Name]Prefix` | `XButtonPrefix` |

### 2.2 服务命名
- 格式：`[Name]Service`
- 示例：`ConfigService`, `IconService`, `PrismService`

### 2.3 接口命名
- 应用接口：`App[Name]`（如 `AppMenu`）
- 组件接口：`X[Name]`（如 `XButtonType`）

### 2.4 文件命名
- 组件：`[name].component.ts`
- 属性：`[name].property.ts`
- 模块：`[name].module.ts`
- 服务：`[name].service.ts`
- 接口：`[name].interface.ts`
- 样式：`[name].component.scss`
- 测试：`[name].component.spec.ts`

---

## 3. TypeScript 规范

### 3.1 输入属性定义
```typescript
// ✅ 正确：使用 input() 函数 + readonly
readonly type = input<XButtonType>(this.config?.type ?? 'initial');
readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });

// ❌ 错误：使用 @Input() 装饰器
@Input() type: XButtonType = 'initial';
```

### 3.2 状态管理
```typescript
// ✅ 正确：使用 signal
contentIsEmpty = signal(false);
transition = signal(true);

// ✅ 正确：使用 computed 派生状态
disabledComputed = computed(() => this.loading() || this.disabled());

// ❌ 错误：使用普通属性
contentIsEmpty = false;
```

### 3.3 依赖注入
```typescript
// ✅ 正确：使用 inject()
private buttons = inject(XButtonsComponent, { optional: true, host: true });
private focusMonitor = inject(FocusMonitor);
doc: Document = inject(DOCUMENT);

// ❌ 错误：使用构造函数注入
constructor(private buttons: XButtonsComponent) {}
```

### 3.4 视图查询
```typescript
// ✅ 正确：使用 viewChild
buttonRef = viewChild.required('buttonRef', { read: ElementRef<HTMLElement> });
contentRef = viewChild.required<ElementRef<HTMLElement>>('content');

// ❌ 错误：使用 @ViewChild
@ViewChild('buttonRef') buttonRef: ElementRef;
```

### 3.5 宿主绑定
```typescript
// ✅ 正确：使用 @HostBinding
@HostBinding('style.marginLeft') get marginLeft() {
  return this.buttons?.space();
}
@HostBinding('class.shrink') get shrink() {
  return this.layout.shrink();
}
```

---

## 4. 组件规范

### 4.1 组件定义
```typescript
@Component({
  selector: `${XButtonPrefix}`,           // 使用常量
  imports: [NgClass, XIconComponent],     // 独立组件，使用 imports
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,  // 样式封装
  changeDetection: ChangeDetectionStrategy.OnPush  // 变更检测
})
export class XButtonComponent extends XButtonProperty implements AfterViewInit {
  // ...
}
```

### 4.2 属性类定义
```typescript
@Component({ selector: `${XButtonPrefix}-property`, template: '' })
export class XButtonProperty extends XPropertyFunction(X_BUTTON_CONFIG_NAME) {
  /**
   * @zh_CN 按钮类型
   * @en_US Button type
   * @example
   * ```html
   * <x-button type="primary">Primary</x-button>
   * ```
   */
  readonly type = input<XButtonType>(this.config?.type ?? 'initial');
}
```

### 4.3 模块定义
```typescript
@NgModule({
  exports: [XButtonComponent, XButtonsComponent],
  imports: [XButtonComponent, XButtonsComponent]
})
export class XButtonModule {}
```

### 4.4 公共 API 导出
```typescript
// public-api.ts
export * from './button.component';
export * from './buttons.component';
export * from './button.module';
export * from './button.property';

// index.ts
export * from './public-api';
```

---

## 5. 样式规范

### 5.1 SCSS 结构
```scss
@use '../style/mixins/reset.scss' as *;
@use './style/mixin.scss' as *;
@use './style/param.scss' as *;

#{$x-button} {
  display: inline-block;
}

.#{$x-button} {
  @include reset-component();
  @include button();
}
```

### 5.2 CSS 变量
- 使用 CSS 变量定义主题色
- 变量命名：`$x-[component]-[property]`
- 示例：`$x-button-primary-color`, `$x-button-primary-background`

### 5.3 样式封装
- 组件使用 `ViewEncapsulation.None`
- 使用唯一类名前缀避免样式冲突

---

## 6. 路由规范

### 6.1 路由配置
```typescript
// ✅ 正确：使用懒加载
export const MainRoutes: Routes = [
  {
    path: `${environment.layout}`,
    loadChildren: () => import('../main/layout/layout-routes.module').then((x) => x.LayoutRoutes)
  },
  { path: '', redirectTo: `${environment.layout}`, pathMatch: 'full' }
];
```

### 6.2 路由模块命名
- 路由文件：`[name]-routes.module.ts`
- 导出名称：`[Name]Routes`

---

## 7. 测试规范

### 7.1 测试文件结构
```typescript
xdescribe(XButtonPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestButtonComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withFetch()),
        provideZonelessChangeDetection()
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });

  xdescribe('default.', () => {
    // 测试用例
  });
});
```

### 7.2 测试组件命名
- 测试组件：`XTest[Name]Component`
- 属性测试：`XTest[Name]PropertyComponent`

---

## 8. 注释规范

### 8.1 JSDoc 注释
```typescript
/**
 * @zh_CN 中文说明
 * @en_US English description
 * @example
 * ```html
 * <x-button type="primary">Primary</x-button>
 * ```
 */
```

### 8.2 文件头注释
```typescript
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 */
```

---

## 9. Git 提交规范

### 9.1 提交格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

### 9.2 类型说明
| 类型 | 说明 |
|------|------|
| feat | 新功能 |
| fix | Bug 修复 |
| docs | 文档更新 |
| style | 代码格式（不影响功能） |
| refactor | 重构 |
| test | 测试相关 |
| chore | 构建/工具相关 |

### 9.3 示例
```
feat(module:input): add auto width

fix(module:select): fix auto width value
```

---

## 10. 国际化规范

### 10.1 支持语言
- 中文：`zh_CN`
- 英文：`en_US`

### 10.2 路由国际化
```typescript
routerLink: "docs/en_US/components/button"
routerLink: "docs/zh_CN/components/button"
```

### 10.3 文件国际化
- 文档文件：`readme.en_US.md`, `readme.zh_CN.md`
- 语言文件：`public/i18n/en_US.json`, `public/i18n/zh_CN.json`

---

## 11. 路径别名

| 别名 | 路径 |
|------|------|
| `@ng-nest/ui` | `./lib/ng-nest/ui/` |
| `@ng-nest/ui/*` | `./lib/ng-nest/ui/*` |
| `@services` | `./src/services/index` |
| `@utils` | `./src/utils/` |
| `@environments` | `./src/environments/` |
| `@share` | `./src/share/` |
| `@interfaces` | `./src/interfaces/` |

---

## 12. 禁止事项

1. ❌ 禁止使用 `@Input()`, `@Output()` 装饰器，使用 `input()`, `output()` 函数
2. ❌ 禁止使用 `@ViewChild`, `@ViewChildren`，使用 `viewChild()`, `viewChildren()`
3. ❌ 禁止在构造函数中注入依赖，使用 `inject()`
4. ❌ 禁止使用普通属性管理状态，使用 `signal()`
5. ❌ 禁止使用 `any` 类型（严格模式）
6. ❌ 禁止直接修改组件库公共 API
7. ❌ 禁止跳过 TypeScript 严格检查

---

## 13. 待确认事项

> 以下场景需要先讨论确认后再实施：

- [ ] 新增组件库组件
- [ ] 修改现有组件 API
- [ ] 添加新的路径别名
- [ ] 修改构建配置
- [ ] 添加新的第三方依赖
- [ ] 修改国际化配置
- [ ] 新增测试框架或工具

---

**最后更新**: 2026-03-24  
**维护者**: 开发团队
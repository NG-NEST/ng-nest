---
order: 2
label: '快速上手'
---

# 快速上手

## 1. 使用 Angular CLI 创建和初始化项目

运行 `Angular CLI` 命令 `ng new` 并提供 `my-app` 参数来设置项目名称。

```bash
$ ng new my-app
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use?
  CSS
> SCSS   [ https://sass-lang.com/documentation/syntax#scss                ]
  Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
  Less   [ http://lesscss.org                                             ]
  Stylus [ http://stylus-lang.com                                         ]
```

```warning
此处请选择 SCSS 来做样式语言，暂不支持其它语言。
```

Angular CLI 会安装必要的依赖包。这可能要花几分钟的时间，CLI 会在当前目录中创建一个工作区。

{{ __my-app\__1:src/index.html }}

## 2. 使用 npm 安装 @ng-nest/ui 包并导入模块

转到工作区文件夹 `my-app` ，安装 `@ng-nest/ui` 。

```bash
$ cd my-app
$ npm install @ng-nest/ui
```

打开 src/app/app.module.ts 文件导入模块。

{{ __my-app\__2 }}

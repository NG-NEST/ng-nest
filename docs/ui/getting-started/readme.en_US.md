---
order: 2
label: 'Getting Started'
---

# Getting Started

> Please set up the environment before starting, how to set up the environment please check [angular](https://angular.dev/installation) official tutorial。

Run `ng --version` to check the current version, please do not go below the version number.

{{ ____bash:1.bash:false:false }}

## 1. Create and initialize projects using the Angular CLI

Open the command line window and create the project using the `ng new My-app` command, `my-app` for the project name.

{{ __1\__bash:1.bash:false:false }}

The Angular CLI installs the necessary dependency packages. This may take a few minutes, and the CLI will create a workspace in the current directory.

{{ __1\__my-app:src/index.html }}

## 2. Use npm to install @ng-nest/ui

Go to the workspace folder `my-app` and install `@ng-nest/ui`.

{{ __2\__bash:1.bash:false:false }}

Open the `src/styles.scss` file to add a common style.

{{ __2.1\__my-app:src/styles.scss:false }}

Or in `angular.json` in `projects/my-app/architect/build/options/styles` attribute to add.

{{ __2.2\__my-app:angular.json:false }}

## 3. Add component use

Open the `src/app/app.config.ts` file and add the `provideHttpClient` HTTP request and the `provideAnimations` animation module.

{{ __3.1\__my-app:src/app/app.config.ts:false }}

Open the `src/app/app.module.ts` file to introduce the `x-button` component module.

{{ __3.2\__my-app:src/app/app.module.ts:false }}

```primary
All components are supported separately, and introducing all components at once can result in a large package size.
All components now support `Zoneless`, and you can add the ` provideZonelessChangeDetection()` module in `app.config.ts`, `Zoneless` related configurations can be viewed in the [official documentation](https://angular.dev/guide/experimental/zoneless).
```

Open src/app/app.component.html replaced with the following code, and modify the corresponding SCSS style.

{{ __3.3\__my-app:src/app/app.component.html }}

Then open the command line tool in the my-app project root and use `ng serve -o` to run the project.

{{ __3\__bash:1.bash:false:false }}

You will then see the default browser open http://localhost:4200/ page and display the following:

{{ __3\__img:1.png:false:false }}

## Next step

Congratulations! You have successfully integrated the components of `ng-nest` into your project.

To continue exploring `ng-nest`, select one of the following options:

- [Tutorial：RBAC System](index/docs/en_US/course/rbac/1-introduction)，In this tutorial, you will build an application that manages users and permissions.

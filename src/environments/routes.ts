import { Routes } from "@angular/router";
import { environment } from "./environment";

export const shareRoutes: Routes = [
  {
    path: "no-auth",
    loadChildren: "src/main/no-auth/no-auth.module#NoAuthModule"
  },
  {
    path: "**",
    loadChildren: "src/main/exception/404.module#Exception404Module"
  }
];

export const mainRoutes: Routes = [
  {
    path: environment.layout,
    loadChildren: "src/main/layout/layout.module#LayoutModule"
  },
  { path: "", redirectTo: environment.layout, pathMatch: "full" },

  ...shareRoutes
];

export const layoutRoutes: Routes = [
  { path: "", redirectTo: environment.defaultPage, pathMatch: "full" },
  { path: "home", loadChildren: "src/main/home/home.module#HomeModule" },
  { path: "demo", loadChildren: "src/main/demo/demo.module#DemoModule" },
  { path: "docs", loadChildren: "src/main/docs/docs.module#DocsModule" },
  { path: "news", loadChildren: "src/main/news/news.module#NewsModule" },

  ...shareRoutes
];

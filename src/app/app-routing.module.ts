import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./layouts/auth/auth.component";

import { FullComponent } from "./layouts/full/full.component";
import { LoginComponent } from "./login/login.component";

export const Approutes: Routes = [
  {
    path: "",
    component: FullComponent,
    children: [
      {
        path: "user",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./user/user.module").then((m) => m.UserModule),
          },
        ],
      },
      {
        path: "agency",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./agency/agency.module").then((m) => m.AgencyModule),
          },
        ],
      },
      {
        path: "setting",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./setting/setting.module").then((m) => m.SettingModule),
          },
        ],
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "about",
        loadChildren: () =>
          import("./about/about.module").then((m) => m.AboutModule),
      },
      {
        path: "component",
        loadChildren: () =>
          import("./component/component.module").then(
            (m) => m.ComponentsModule
          ),
      },
    ],
  },
  {
    path: "auth",
    component: AuthComponent, //Layout component
    children: [
      {
        path: "login",
        loadChildren: () =>
          import("./login/login.module").then((m) => m.LoginModule),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "/dashboard",
  },
];

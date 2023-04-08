import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./layouts/auth/auth.component";

import { FullComponent } from "./layouts/full/full.component";
import { LoginComponent } from "./auth/login/login.component";

export const Approutes: Routes = [
  {
    path: "auth",
    component: AuthComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./auth/auth.module").then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: "",
    component: FullComponent,
    children: [
      {
        path: "user",
        loadChildren: () =>
          import("./user/user.module").then((m) => m.UserModule),
      },
      {
        path: "tour",
        loadChildren: () =>
          import("./tour/tour.module").then((m) => m.TourModule),
      },
      {
        path: "agency",
        loadChildren: () =>
          import("./agency/agency.module").then((m) => m.AgencyModule),
      },
      {
        path: "setting",
        loadChildren: () =>
          import("./setting/setting.module").then((m) => m.SettingModule),
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
    path: "",
    pathMatch: "full",
    redirectTo: "dsf/dashboard",
  },
];

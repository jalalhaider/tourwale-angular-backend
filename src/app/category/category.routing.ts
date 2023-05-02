import { Routes } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { ListComponent } from "./list/list.component";

export const routes: Routes= [
    {
        path: "list",
        data: {
          title: "List Category",
          urls: [{ title: "list", url: "/user/list" }, { title: "List" }],
        },
        component: ListComponent,
      },
];
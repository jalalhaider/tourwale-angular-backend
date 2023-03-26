import { Routes } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { ListComponent } from "./list/list.component";
import { UpdateComponent } from "./update/update.component";

export const routes: Routes = [
  {
    path: "",
    data: {
      title: "List Setting",
      urls: [{ title: "list", url: "/setting/list" }, { title: "List" }],
    },
    component: ListComponent,
  },
  {
    path: "create",
    data: {
      title: "Create Setting",
      urls: [{ title: "create", url: "/setting/create" }, { title: "Create" }],
    },
    component: CreateComponent,
  },
  {
    path: "update",
    data: {
      title: "Create Setting",
      urls: [{ title: "create", url: "/setting/create" }, { title: "Create" }],
    },
    component: UpdateComponent,
  },
];

import { Routes } from "@angular/router"
import { CreateComponent } from "./create/create.component"
import { ListComponent } from "./list/list.component"
import { UpdateComponent } from "./update/update.component"

export const routes: Routes = [
  {
    path: "list",
    data: {
      title: "List Tour",
      urls: [{ title: "list", url: "/user/tour" }, { title: "Tour" }],
    },
    component: ListComponent,
  },
  {
    path: "create",
    component: CreateComponent,
  },
  {
    path: "update",
    component: UpdateComponent,
  },
]

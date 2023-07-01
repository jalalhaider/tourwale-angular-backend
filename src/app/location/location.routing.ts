import { Routes } from "@angular/router"
import { CreateComponent } from "./create/create.component"
import { ListComponent } from "./list/list.component"
import { UpdateComponent } from "./update/update.component"

export const routes: Routes = [
  {
    path: "list",
    data: {
      title: "List Location",
      urls: [{ title: "list", url: "/location/list" }, { title: "List" }],
    },
    component: ListComponent,
  },
  {
    path: "create",
    data: {
      title: "create Category",
      urls: [{ title: "list", url: "/location/create" }, { title: "create" }],
    },
    component: CreateComponent,
  },
  {
    path: "update",
    data: {
      title: "Update Category",
      urls: [{ title: "list", url: "/location/update" }, { title: "update" }],
    },
    component: UpdateComponent,
  },
]

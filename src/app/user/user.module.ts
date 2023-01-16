import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormComponent } from "./form/form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CreateComponent } from "./create/create.component";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { UpdateComponent } from "./update/update.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "List User",
      urls: [{ title: "List", url: "/user/list" }, { title: "List " }],
    },
    component: ListComponent,
  },
  {
    path: "create",
    data: {
      title: "Create User",
      urls: [{ title: "create", url: "/user/create" }, { title: "Create" }],
    },
    component: CreateComponent,
  },
  {
    path: "update",
    data: {
      title: "Update User",
      urls: [{ title: "List", url: "/user/update" }, { title: "Update " }],
    },
    component: UpdateComponent,
  },
];
@NgModule({
  declarations: [
    FormComponent,
    CreateComponent,
    ListComponent,
    UpdateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class UserModule {}

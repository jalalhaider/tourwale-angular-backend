import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from "./register.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Register",
      urls: [
        { title: "LoRegistergin", url: "/register" },
        { title: "Register" },
      ],
    },
    component: RegisterComponent,
  },
];
@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RegisterModule {}

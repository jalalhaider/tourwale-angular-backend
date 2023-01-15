import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Login",
      urls: [{ title: "Login", url: "/login" }, { title: "Login" }],
    },
    component: LoginComponent,
  },
];
@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class LoginModule {}

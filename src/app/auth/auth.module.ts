import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"
import { NgbModule } from "@ng-bootstrap/ng-bootstrap"
import { ComponentsModule } from "../component/component.module"
import { routes } from "./auth.routing"
import { AuthService } from "./auth.service"
import { AuthInterceptor } from "./interceptors/request.interceptor"
import { LoginComponent } from "./login/login.component"

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    NgbModule,
  ],
  providers: [AuthService, AuthInterceptor],
  declarations: [LoginComponent],
})
export class AuthModule {}

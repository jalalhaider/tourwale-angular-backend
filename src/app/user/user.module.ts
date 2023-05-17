import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"
import { ComponentsModule } from "../component/component.module"
import { CreateComponent } from "./create/create.component"
import { FormComponent } from "./form/form.component"
import { ListComponent } from "./list/list.component"
import { routes } from "./user.routing"
import { UserService } from "./user.service"
import { UpdateComponent } from "./update/update.component"
import { NgbModule } from "@ng-bootstrap/ng-bootstrap"

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    NgbModule,
  ],
  providers: [UserService],
  declarations: [
    CreateComponent,
    FormComponent,
    UpdateComponent,
    ListComponent,
  ],
})
export class UserModule {}

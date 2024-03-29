import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"
import { ComponentsModule } from "../component/component.module"
import { CreateComponent } from "./create/create.component"
import { FormComponent } from "./form/form.component"
import { ListComponent } from "./list/list.component"
import { routes } from "./setting.routing"
import { SettingService } from "./setting.service"
import { UpdateComponent } from "./update/update.component"

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),

    ComponentsModule,
  ],
  providers: [SettingService],
  declarations: [
    CreateComponent,
    FormComponent,
    UpdateComponent,
    ListComponent,
  ],
})
export class SettingModule {}

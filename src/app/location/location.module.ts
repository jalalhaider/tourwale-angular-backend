import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { ComponentsModule } from "../component/component.module"
import { CommonModule } from "@angular/common"
import { NgbModule } from "@ng-bootstrap/ng-bootstrap"
import { LocationService } from "./location.service"
import { QuillModule } from "ngx-quill"
import { routes } from "./location.routing"
import { CreateComponent } from "./create/create.component"
import { UpdateComponent } from "./update/update.component"
import { ListComponent } from "./list/list.component"
import { FormComponent } from "./form/form.component"

@NgModule({
  imports: [
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    NgbModule,
  ],
  declarations: [
    CreateComponent,
    ListComponent,
    FormComponent,
    UpdateComponent,
  ],
  providers: [LocationService],
})
export class LocationModule {}

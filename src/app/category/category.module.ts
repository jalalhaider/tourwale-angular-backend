import { NgModule } from "@angular/core"
import { CreateComponent } from "./create/create.component"
import { CategoryService } from "./category.service"
import { RouterModule } from "@angular/router"
import { routes } from "./category.routing"
import { ReactiveFormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { HttpClientModule } from "@angular/common/http"
import { NgbModule } from "@ng-bootstrap/ng-bootstrap"
import { ComponentsModule } from "../component/component.module"
import { ListComponent } from "./list/list.component"
import { FormComponent } from "./form/form.component"
import { UpdateComponent } from "./update/update.component"
@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ComponentsModule,
    NgbModule,
  ],
  declarations: [
    CreateComponent,
    ListComponent,
    FormComponent,
    UpdateComponent,
  ],
  providers: [CategoryService],
})
export class CategoryModule {}

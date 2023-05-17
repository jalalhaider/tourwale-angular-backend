import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { CreateComponent } from "./create/create.component"
import { ListComponent } from "./list/list.component"
import { routes } from "./tour.routing"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { ComponentsModule } from "../component/component.module"
import { CommonModule } from "@angular/common"
import { NgbModule } from "@ng-bootstrap/ng-bootstrap"
import { FormComponent } from "./form/form.component"
import { TourService } from "./tour.service"

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    NgbModule,
  ],
  declarations: [CreateComponent, ListComponent, FormComponent],
  providers: [TourService],
})
export class TourModule {}

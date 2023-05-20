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
import { QuillModule } from "ngx-quill"
import { FileUploadComponent } from "./components/file-upload/file-upload.component"
import { ItineraryComponent } from "./components/itinerary/itinerary.component"
import { GeneralComponent } from "./components/general/general.component"
import { InformationComponent } from "./components/information/information.component"
import { ItineraryService } from "./itinerary.service"
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
    FileUploadComponent,
    ItineraryComponent,
    GeneralComponent,
    InformationComponent,
  ],
  providers: [ItineraryService, TourService],
})
export class TourModule {}

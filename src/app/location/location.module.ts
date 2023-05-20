import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { ComponentsModule } from "../component/component.module"
import { CommonModule } from "@angular/common"
import { NgbModule } from "@ng-bootstrap/ng-bootstrap"
import { LocationService } from "./location.service"
import { QuillModule } from "ngx-quill"
const routes: any[] = []
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
  declarations: [],
  providers: [LocationService],
})
export class LocationModule {}

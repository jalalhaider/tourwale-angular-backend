import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ComponentsModule } from "../component/component.module";
import { CreateComponent } from "./create/create.component";
import { FormComponent } from "./form/form.component";
import { ListComponent } from "./list/list.component";
import { routes } from "./agency.routing";
import { AgencyService } from "./agency.service";
import { UpdateComponent } from "./update/update.component";

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ComponentsModule,
  ],
  providers: [AgencyService],
  declarations: [
    CreateComponent,
    FormComponent,
    UpdateComponent,
    ListComponent,
  ],
})
export class AgencyModule {}

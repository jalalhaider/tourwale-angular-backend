import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { FormComponent } from "./form/form.component";
import { ListComponent } from "./list/list.component";
import { routes } from "./setting.routing";
import { SettingService } from "./setting.service";
import { UpdateComponent } from "./update/update.component";

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
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

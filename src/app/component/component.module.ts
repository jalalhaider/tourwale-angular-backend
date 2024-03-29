import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { NgbModule } from "@ng-bootstrap/ng-bootstrap"
import { ComponentsRoutes } from "./component.routing"
import { NgbdpaginationBasicComponent } from "./pagination/pagination.component"
import { NgbdAlertBasicComponent } from "./alert/alert.component"
import { NgbdDropdownBasicComponent } from "./dropdown-collapse/dropdown-collapse.component"
import { NgbdnavBasicComponent } from "./nav/nav.component"
import { ButtonsComponent } from "./buttons/buttons.component"
import { CardsComponent } from "./card/card.component"
import { TableComponent } from "./table/table.component"
import { LoadingBarComponent } from "./loading-bar/loading-bar.component"
import { ToastComponent } from "./toast/toast.component"
import { ToasterComponent } from "./toast/toaster.component"
import { ToastService } from "../shared/services/toast.service"
import { MultiFileUploaderComponent } from "./multi-file-uploader/multi-file-uploader.component"

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [
    NgbdpaginationBasicComponent,
    NgbdAlertBasicComponent,
    NgbdDropdownBasicComponent,
    NgbdnavBasicComponent,
    ButtonsComponent,
    CardsComponent,
    TableComponent,
    LoadingBarComponent,
    ToastComponent,
    ToasterComponent,
    MultiFileUploaderComponent,
  ],

  exports: [
    NgbdAlertBasicComponent,
    LoadingBarComponent,
    ToasterComponent,
    MultiFileUploaderComponent,
  ],
})
export class ComponentsModule {}

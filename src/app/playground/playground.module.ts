import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { TestingComponent } from "./testing/testing.component"
import { FileUploadComponent } from "./file-upload/file-upload.component"
import { ReactiveFormsModule } from "@angular/forms"
import { NgbModule } from "@ng-bootstrap/ng-bootstrap"
import { CommonModule } from "@angular/common"

const routes = [
  {
    path: "testing",
    component: FileUploadComponent,
  },
  {
    path: "file-upload",
    component: FileUploadComponent,
  },
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TestingComponent, FileUploadComponent],
})
export class PlaygroundModule {}

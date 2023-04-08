import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { ListComponent } from "./list/list.component";
import { routes } from "./tour.routing";

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    declarations:[
        CreateComponent,
        ListComponent
    ]
})
export class TourModule {

}
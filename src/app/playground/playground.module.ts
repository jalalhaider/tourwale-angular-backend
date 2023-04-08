import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TestingComponent } from "./testing/testing.component";


const routes = [
    {
        path:'testing',
        component: TestingComponent
    }
]
@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ]
})
export class PlaygroundModule{

}
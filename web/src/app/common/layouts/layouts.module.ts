import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {MainLayoutComponent} from "./main-layout.component";
import {CoreModule} from "@abo/core/core.module";

@NgModule({
    imports: [
        CoreModule,
        RouterModule
    ],
    declarations: [
        MainLayoutComponent
    ]
})
export class LayoutsModule
{

}

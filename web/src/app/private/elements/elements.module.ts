import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { AppConstants } from "@abo/app.constants";
import { BaseModule } from "@abo/common/base/base.module";
import { ElementsListComponent } from "./list/elements-list.component";
import { ElementsEditComponent } from "./edit/elements-edit.component";

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        RouterModule.forChild([
            {
                path: "",
                component: ElementsListComponent
            },
            {
                path: AppConstants.Routing.Parts.EDIT,
                component: ElementsEditComponent
            }
        ])
    ],
    declarations: [ElementsListComponent, ElementsEditComponent]
})
export class ElementsModule
{
}

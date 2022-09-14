import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { routes } from "@abo/app-routes";

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            onSameUrlNavigation: "reload"
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }

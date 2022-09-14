import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "@abo/core/core.module";
import { LayoutsModule } from "@abo/common/layouts/layouts.module";
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CoreModule,
        AppRoutingModule,
        LayoutsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

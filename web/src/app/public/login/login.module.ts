import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { LoginComponent } from "./login.component";
import { BaseModule } from "@abo/common/base/base.module";

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        RouterModule.forChild([
            {
                path: "",
                component: LoginComponent
            }
        ])
    ],
    declarations: [LoginComponent]
})
export class LoginModule
{
}

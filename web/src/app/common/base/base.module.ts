import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslocoModule} from "@ngneat/transloco";

import {BaseListComponent} from "./base-list.component";
import {BaseFormComponent} from "./base-form.component";

@NgModule({
    declarations: [ BaseListComponent, BaseFormComponent ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslocoModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        TranslocoModule
    ]
})
export class BaseModule
{

}

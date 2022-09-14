import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { TasksComponent } from "./tasks.component";
import { BaseModule } from "@abo/common/base/base.module";

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        RouterModule.forChild([
            {
                path: "",
                component: TasksComponent
            }
        ])
    ],
    declarations: [TasksComponent]
})
export class TasksModule
{
}

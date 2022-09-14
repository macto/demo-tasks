import { Component, OnInit } from "@angular/core";

import { LoggerService } from "@abo/core/services/logger.service";
import { Observable } from "rxjs";
import { TaskModel } from "@abo/common/models/task.model";
import { SdkApiService } from "@abo/common/sdk/sdk-api.service";
import { map } from "rxjs/operators";
import { BaseFormComponent } from "@abo/common/base/base-form.component";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: "app-tasks",
    templateUrl: "tasks.component.html",
    styleUrls: ["tasks.component.scss"],
})
export class TasksComponent extends BaseFormComponent<TaskModel> implements OnInit
{
    public todoTasks$: Observable<Array<TaskModel>>;
    public doneTasks$: Observable<Array<TaskModel>>;
    public showNewTask = false;
    public loadingSave = false;

    constructor(logger: LoggerService,
                private sdkSrv: SdkApiService) {
        super(logger);
    }

    public ngOnInit() {
        this.getTodo();
        this.getDone();
        this.theForm = new FormGroup({
            name: new FormControl(),
            description: new FormControl()
        });
    }

    public processForm() {
        super.processForm();
        this.log.debug("form is valid", this.theForm.valid);
        if (this.theForm.valid) {
            this.loadingSave = true;
            this.sdkSrv.saveTask(this.theForm.getRawValue()).subscribe(
                (data) => {
                    this.log.debug("task saved", data);
                    this.loadingSave = false;
                    this.showNewTask = false;
                    this.getTodo();
                }
            );
        }
    }

    public doDone(id: string) {
        this.loadingSave = true;
        this.sdkSrv.setTaskAsDone(id).subscribe((data) => {
            this.log.debug("task saved", data);
            this.loadingSave = false;
            this.getTodo();
            this.getDone();
        })
    }


    private getTodo() {
        this.todoTasks$ = this.sdkSrv.getTasks().pipe(
            map(data => data?.length && data.filter(item => !item.isDone))
        );
    }

    private getDone() {
        this.doneTasks$ = this.sdkSrv.getTasks().pipe(
            map(data =>  data?.length && data.filter(item => item.isDone))
        );
    }
}

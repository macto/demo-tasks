import { Component, OnDestroy } from "@angular/core";
import {FormGroup} from "@angular/forms";

import {BasePageComponent} from "./base-page.component";
import {LoggerService} from "@abo/core/services/logger.service";


@Component({
    selector: "app-base-form",
    template: "",
})
export class BaseFormComponent<T> extends BasePageComponent implements OnDestroy
{
    public theModel: T;
    public theForm: FormGroup = null as unknown as FormGroup;

    public state = {
        isLoading: false
    };

    public constructor(protected logger: LoggerService) {
        super(logger);
        this.theModel = { } as T;
    }

    public ngOnDestroy() {
        this.resetData();
    }

    public processForm(): void {
        this.log.debug("form data", this.theForm && this.theForm.getRawValue());
    }

    protected resetData(): void {
        // theModel must be reset
        if (this.theForm) {
            this.theForm.reset();
            this.theForm.patchValue(this.theModel);
        }
    }


    protected buildForm(): void {
        // should be implemented in child components
    }
}

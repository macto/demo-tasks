import { Component } from "@angular/core";

import { LoggerService } from "@abo/core/services/logger.service";
import { BaseFormComponent } from "@abo/common/base/base-form.component";
import { ElementModel } from "@abo/common/models/element.model";

@Component({
    selector: "app-elements-edit",
    templateUrl: "elements-edit.component.html",
    styleUrls: ["elements-edit.component.scss"],
})
export class ElementsEditComponent extends BaseFormComponent<ElementModel>
{
    constructor(logger: LoggerService) {
        super(logger);
    }

}

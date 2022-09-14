import { Component } from "@angular/core";

import { LoggerService } from "@abo/core/services/logger.service";
import { BaseComponent } from "@abo/common/base/base.component";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent extends BaseComponent
{
    public name = "AppComponent";

    public constructor(logger: LoggerService) {
        super(logger);
        this.log.debug("initialized");
    }
}

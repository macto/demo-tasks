import { Component, OnInit } from "@angular/core";

import {BaseComponent} from "../base/base.component";
import {LoggerService} from "@abo/core/services/logger.service";
import {AppConstants} from "@abo/app.constants";

@Component({
    selector: "app-main-layout",
    templateUrl: "./main-layout.component.html",
    styleUrls: ["./main-layout.component.scss"]
})
export class MainLayoutComponent extends BaseComponent implements OnInit
{
    public constructor(protected logger: LoggerService) {
        super(logger);
    }

    public ngOnInit(): void {
        //
    }
}

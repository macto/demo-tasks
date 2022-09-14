import { Component } from "@angular/core";

import { BaseListComponent } from "@abo/common/base/base-list.component";
import { ElementModel } from "@abo/common/models/element.model";
import { LoggerService } from "@abo/core/services/logger.service";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { AppConstants } from "@abo/app.constants";

@Component({
    selector: "app-elements",
    templateUrl: "elements-list.component.html",
    styleUrls: ["elements-list.component.scss"],
})
export class ElementsListComponent extends BaseListComponent<ElementModel>
{
    constructor(logger: LoggerService,
                protected router: Router
    ) {
        super(logger, router);
        this.name = "elements";
        this.log.debug("Initialized");
    }

    public initList() {
        this.cols = [
            { prop: "name", key: "list.name" },
            { prop: "desc", key: "list.desc" },
            { prop: "status", key: "list.status" }
        ]
    }

    protected fetchData(page: number): Observable<Array<ElementModel>> {
        return of(
            [
                { id: 1, name: "Element 1", desc: "Desc 1", count: 1 },
                { id: 2, name: "Element 2", desc: "Desc 2", count: 100 }
            ]
        )
    }
}

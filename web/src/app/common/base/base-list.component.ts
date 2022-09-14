import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";

import { BasePageComponent } from "./base-page.component";
import { LoggerService } from "@abo/core/services/logger.service";
import { TableHeader, TablePaging } from "@abo/common/types/table.types";
import { AppConstants } from "@abo/app.constants";
import { map, take } from "rxjs/operators";

@Component({
    selector: "app-base-list",
    template: "",
})
export class BaseListComponent<T, V = any> extends BasePageComponent implements OnInit, OnDestroy
{
    public cols: Array<TableHeader>;
    public rows$: Observable<Array<T>>;
    public pageData?: TablePaging;

    protected name = "unknown";
    protected urlBase = `/${AppConstants.Routing.BASE_PRIVATE}`;

    public constructor(logger: LoggerService,
                       protected router: Router) {
        super(logger);
    }

    public ngOnInit(): void {
        this.initList();
        this.loadPage({offset: 0} as TablePaging);
    }

    public ngOnDestroy() {
        //
    }

    public loadPage(paging: TablePaging) {
        this.log.debug("load page...", paging);

        this.rows$ = this.fetchData(paging.offset + 1).pipe(
            take(1),
            map(resp => {
                const data = resp as any;
                this.log.debug("fetching and mapping response...", resp);

                return data;
            } )
        );
    }

    public goToEdit(item: T) {
        this.log.debug("click on edit", item);
        if (item) {
            this.router.navigate([`${this.urlBase}/${this.name}/${AppConstants.Routing.EDIT_SUFFIX}`, (item as any).id]);
        } else {
            this.log.warn("No data!!");
        }
    }

    protected initList(): void {
        // should be implemented in child components
    }

    protected fetchData(page: number): Observable<V|null> {
        // should be implemented in child components
        return of(null);
    }
}

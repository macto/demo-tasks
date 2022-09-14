import {Injectable} from "@angular/core";
import {SimpleLoggerService} from "@macto/ngx-simple-logger";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { TaskModel } from "@abo/common/models/task.model";
import { environment } from "@abo/environments/environment";
import { map } from "rxjs/operators";


@Injectable({providedIn: "root"})
export class SdkApiService
{
    private urlBase = environment.api.base + "/todos";

    public constructor(private logger: SimpleLoggerService,
                       private http: HttpClient) {
        this.logger.debug("Initialized SdkMockService");
    }

    public getTasks(isDone = false): Observable<Array<TaskModel>> {
        return this.http.get<any>(this.urlBase).pipe(map(data => data?.data));
    }

    public saveTask(t: TaskModel): Observable<TaskModel> {
        let obs;
        if (t._id) {
            obs = this.http.put(this.urlBase + "/" + t._id, t);
        } else {
            t.status = 1;
            t.createdAt = Date.now();
            obs = this.http.post(this.urlBase, t);
        }

        return obs;
    }

    public setTaskAsDone(id: string): Observable<TaskModel> {
        return this.http.patch<TaskModel>(this.urlBase + "/" + id, {isDone: true, status: 2});
    }

    public archiveTask(id: string): Observable<TaskModel> {
        return this.http.patch<TaskModel>(this.urlBase + "/" + id, {isDone: true, status: 3});
    }

    public removeTask(id: string): Observable<any> {
        return this.http.delete(this.urlBase + "/" + id);
    }
}

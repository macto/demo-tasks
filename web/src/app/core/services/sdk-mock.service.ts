import {Injectable} from "@angular/core";

import {SimpleLoggerService} from "@macto/ngx-simple-logger";
import { UserModel } from "@abo/common/models/user.model";
import { of } from "rxjs";

@Injectable({providedIn: "root"})
export class SdkMockService
{
    private token: string;

    public constructor(private logger: SimpleLoggerService) {
        this.logger.debug("Initialized SdkMockService");
    }

    public login(credentials: UserModel) {
        return of({
            data: {
                email: "test@abo",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEBhYm8iLCJuYW1lIjoiVGVzdCIsInJvbGUiOjEsImlhdCI6MTYwMDAwMDAwMCwiZXhwIjoxNzAwMDAwMDAwfQ.pbBA5ePVajhGtXwTtTxvPhIYLrlB2cVmC_2EyQVKQcg",
                name: "Test"
            },
            error: false
        });
    }

    public getToken(): string | null {
        return this.token;
    }

    public setToken(t: string) {
        this.token = t;
    }

    public clearToken() {
        this.token = null;
    }
}

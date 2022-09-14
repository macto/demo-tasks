import {Injectable} from "@angular/core";
import {CanLoad} from "@angular/router";

import {AppAuthService} from "./auth.service";
import {LoggerService} from "@abo/core/services/logger.service";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanLoad
{
    public constructor(private authSrv: AppAuthService,
                       private log: LoggerService) {
    }

    public canLoad(): boolean {
        const isLogged = this.authSrv.isLoggedIn();

        if (isLogged) {
            this.log.debug("User is logged: access granted");
            this.authSrv.checkTokenAndUpdate();
        } else {
            this.log.debug("User is not logged in... logout");
            this.authSrv.logout();
        }

        return isLogged;
    }
}

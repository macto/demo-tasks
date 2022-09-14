import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

import {AppConstants} from "@abo/app.constants";
import {LoggerService} from "@abo/core/services/logger.service";
import {StorageService} from "../services/storage.service";
import { UserModel } from "@abo/common/models/user.model";
import { SdkMockService } from "@abo/core/services/sdk-mock.service";


@Injectable({providedIn: "root"})
export class AppAuthService
{
    public currentUser: Observable<UserModel>;
    private readonly currentUserSubject: BehaviorSubject<UserModel>;

    public constructor(private log: LoggerService,
                       private sdk: SdkMockService,
                       private storageSrv: StorageService,
                       private router: Router
    ) {
        this.currentUserSubject = new BehaviorSubject<UserModel>(this.getUserFromStorage());
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public getCurrent(): UserModel {
        return this.currentUserSubject && this.currentUserSubject.value;
    }

    public login(username: string, password: string): Observable<UserModel> {
        const credentials = {user: username, pass: password} as UserModel;

        return this.sdk.login(credentials).pipe(
            map(res => {
                const user = !res.error && res.data;
                if (user && user.token) {
                    const userModel = {
                        user: user.email,
                        token: user.token
                    };
                    this.log.debug("Login successfully: " + user.token);
                    this.saveUserInStorage(userModel);
                    this.sdk.setToken(user.token);
                    this.currentUserSubject.next(userModel);
                    return { user: user.email, token: user.token};
                } else {
                    this.log.warn("Unexpected response: user and/or token are invalid", user);
                    throw new Error("Unexpected user response");
                }
            })
        );
    }

    public logout(returnUrl?: string) {
        this.removeDataFromStorage();
        this.sdk.clearToken();
        this.currentUserSubject.next(null);

        const extras = !!returnUrl ? { queryParams: { returnUrl } } : {};
        this.router.navigate(["/login"], extras);
    }

    public isLoggedIn(): boolean {
        const user = this.getUserFromStorage();
        const helper = new JwtHelperService();

        return user && !helper.isTokenExpired(user.token);
    }

    public checkTokenAndUpdate() {
        const userStorage = this.getUserFromStorage();
        const currentUser = this.getCurrent();
        const token = userStorage && userStorage.token;
        const sdkToken = this.sdk.getToken();

        if (!sdkToken || !currentUser || (currentUser.token !== token)) {
            this.log.debug("Syncing stored token to API Config... " + token);
            this.sdk.setToken(token);
            this.currentUserSubject.next(userStorage);
        }
    }

    public getUserFromStorage(): UserModel {
        return this.storageSrv.getObject<UserModel>(AppConstants.StorageKeys.USER);
    }

    public saveUserInStorage(user: UserModel) {
        this.storageSrv.setObject<UserModel>(AppConstants.StorageKeys.USER, user);
    }

    public removeDataFromStorage() {
        this.storageSrv.removeItem(AppConstants.StorageKeys.USER);
    }
}

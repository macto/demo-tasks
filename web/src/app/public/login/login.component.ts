import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { LoggerService } from "@abo/core/services/logger.service";
import { BaseComponent } from "@abo/common/base/base.component";
import { AppConstants } from "@abo/app.constants";
import { AppAuthService } from "@abo/core/auth/auth.service";
import { catchError, finalize, take, tap } from "rxjs/operators";

@Component({
    selector: "app-login",
    templateUrl: "login.component.html",
    styleUrls: ["login.component.scss"],
})
export class LoginComponent extends BaseComponent implements OnInit
{
    public isPageLoading = true;
    public loginForm: FormGroup;
    public isLoading = false;
    public isError = false;

    constructor(logger: LoggerService,
                private router: Router,
                private formBuilder: FormBuilder,
                private authService: AppAuthService) {
        super(logger);
    }

    public ngOnInit() {
        this.redirectToHomeIfLogged();

        this.loginForm = this.formBuilder.group({
            user: ["", Validators.required],
            pass: ["", Validators.required]
        });
    }

    public doLogin() {
        if (this.loginForm.invalid) {
            return;
        }

        this.isLoading = true;
        this.authService.login(this.loginForm.controls.user.value, this.loginForm.controls.pass.value).pipe(
            tap( (data) => this.log.debug("login...", data)),
            take(1),
            finalize(() => this.isLoading = false),
            catchError(error => {
                this.log.debug("Login failed: ", error);
                this.loginForm.reset();
                this.isError = true;
                throw error;
            })
        ).subscribe(() => {
            this.router.navigate([AppConstants.Urls.PRIVATE_HOME]);
        });
    }

    private checkTokenAndRedirect() {
        return new Promise<void>((resolve, reject) => {
            this.authService.checkTokenAndUpdate();
            if (this.authService.getCurrent()) {
                this.router.navigateByUrl(AppConstants.Urls.PRIVATE_HOME).catch(err => {
                    reject();
                });
            }
            resolve();
        });
    }

    private redirectToHomeIfLogged() {
        this.isPageLoading = true;
        this.checkTokenAndRedirect().finally(() => {
            this.isPageLoading = false;
        });
    }
}

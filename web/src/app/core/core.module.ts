import { NgModule } from "@angular/core";
import { CommonModule, registerLocaleData } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import localeEs from "@angular/common/locales/es";
import {SimpleLoggerModule, SimpleLogLevel} from "@macto/ngx-simple-logger";
import { TRANSLOCO_CONFIG, TRANSLOCO_LOADER, TranslocoConfig,
    TranslocoModule, TranslocoService } from "@ngneat/transloco";

registerLocaleData(localeEs);

import { environment } from "@abo/environments/environment";
import { LoggerService } from "./services/logger.service";
import { TranslateHttpLoader } from "@abo/core/services/translate-http.loader";
import { AppConstants } from "@abo/app.constants";
import { SdkMockService } from "@abo/core/services/sdk-mock.service";


@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        SimpleLoggerModule.forRoot({
            level: !environment.production ? SimpleLogLevel.DEBUG : SimpleLogLevel.ERROR
        }),
        TranslocoModule,
    ],
    exports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        TranslocoModule
    ],
    providers: [
        {
            provide: TRANSLOCO_CONFIG,
            useValue: {
                availableLangs: AppConstants.LANGS,
                defaultLang: environment.defaultLang || AppConstants.DEFAULT_LANG,
                fallbackLang: environment.defaultLang || AppConstants.DEFAULT_LANG,
                prodMode: environment.production,
                flatten: {
                    aot: environment.production
                }
            } as TranslocoConfig
        },
        {provide: TRANSLOCO_LOADER, useClass: TranslateHttpLoader},
        LoggerService
    ]
})
export class CoreModule
{
    public constructor(protected translocoService: TranslocoService) {
        this.translocoService.setActiveLang(environment.defaultLang || AppConstants.DEFAULT_LANG);
    }
}

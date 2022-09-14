import { HttpClient } from "@angular/common/http";
import { Translation, TranslocoLoader } from "@ngneat/transloco";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class TranslateHttpLoader implements TranslocoLoader 
{
    constructor(private http: HttpClient) {}

    getTranslation(langPath: string) {
        return this.http.get<Translation>(`/assets/i18n/${langPath}.json`);
    }
}

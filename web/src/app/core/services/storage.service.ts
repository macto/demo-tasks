import {Injectable} from "@angular/core";

import {SimpleLoggerService} from "@macto/ngx-simple-logger";

@Injectable({providedIn: "root"})
export class StorageService
{
    private storage = localStorage;

    public constructor(private log: SimpleLoggerService) {

    }

    public getItem(key: string): string {
        return this.storage.getItem(key);
    }

    public getObject<T>(key: string): T {
        let ret = null;
        const value = this.getItem(key);
        try {
            ret = JSON.parse(value);
        } catch (err) {
            this.log.error("Error parsing json", key, value);
            ret = null;
        }

        return ret;
    }

    public setItem(key: string, value: string) {
        this.storage.setItem(key, value);
    }

    public setObject<T>(key: string, value: T) {
        try {
            const json = JSON.stringify(value);
            this.storage.setItem(key, json);
        } catch (err) {
            this.log.error("Error json conversion", key, value);
        }
    }

    public removeItem(key: string) {
        this.storage.removeItem(key);
    }
}

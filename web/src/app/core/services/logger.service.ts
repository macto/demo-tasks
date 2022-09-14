import {Injectable} from "@angular/core";

import {SimpleLoggerService} from "@macto/ngx-simple-logger";

@Injectable()
export class LoggerService
{
    public constructor(private logger: SimpleLoggerService) {

    }

    public debug(msg: any, ...others: Array<any>) {
        this.logger.debug(msg, others);
    }

    public warn(msg: string, ...others: Array<any>) {
        this.logger.warn(msg, others);
    }

    public err(msg: string, ...others: Array<any>) {
        this.logger.error(msg, others);
    }

    public info(msg: string, ...others: Array<any>) {
        this.logger.info(msg, others);
    }
}

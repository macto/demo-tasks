import {LoggerService} from "@abo/core/services/logger.service";


export abstract class BaseComponent
{
    protected readonly log: {
        debug: (...args: any) => void;
        warn: (...args: any) => void;
        err: (...args: any) => void;
        info: (...args: any) => void;
    };

    protected constructor(logger: LoggerService) {
        this.log = {
            debug: (msg: string, ...others: any) => {
                logger.debug(this.composeMessage(msg), ...others);
            },
            warn: (msg: string, ...others: any) => {
                logger.warn(this.composeMessage(msg), ...others);
            },
            err: (msg: string, ...others: any) => {
                logger.err(this.composeMessage(msg), ...others);
            },
            info: (msg: string, ...others: any) => {
                logger.info(this.composeMessage(msg), ...others);
            }
        };

        this.log.debug("Component instantiated");
    }

    protected composeMessage(msg: string): string {
        return "[" + this.constructor.name + "] " + msg;
    }
}

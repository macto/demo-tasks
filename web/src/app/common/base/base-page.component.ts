import {BaseComponent} from "./base.component";
import {LoggerService} from "@abo/core/services/logger.service";

export abstract class BasePageComponent extends BaseComponent
{
    protected constructor(logger: LoggerService) {
        super(logger);
    }
}

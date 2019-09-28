import { invalidIntegerError } from '../errors';
import { ArgumentType } from './argument-type';

export class IntegerArgumentType extends ArgumentType {

    static default() {
        return 0;
    }

    static convert(value, flag) {
        if (!value.match(/^[-]?\d+$/)) invalidIntegerError(flag, value);
        return parseInt(value, 10);
    }

}

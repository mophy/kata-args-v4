import { IntegerListArgumentType } from './types/integer-list-argument-type';
import { BooleanArgumentType } from './types/boolean-argument-type';
import { StringArgumentType } from './types/string-argument-type';
import { IntegerArgumentType } from './types/integer-argument-type';
import { StringListArgumentType } from './types/string-list-argument-type';

class Schema {

    constructor(flag, type) {
        this.flag = flag;
        this.type = type;
    }

}

export function BooleanSchema(flag) {
    return new Schema(flag, BooleanArgumentType);
}

export function StringSchema(flag) {
    return new Schema(flag, StringArgumentType);
}

export function IntegerSchema(flag) {
    return new Schema(flag, IntegerArgumentType);
}

export function StringListSchema(flag) {
    return new Schema(flag, StringListArgumentType);
}

export function IntegerListSchema(flag) {
    return new Schema(flag, IntegerListArgumentType);
}

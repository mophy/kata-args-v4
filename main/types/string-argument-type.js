import { ArgumentType } from './argument-type';

export class StringArgumentType extends ArgumentType {

    static default() {
        return '';
    }

    static convert(value) {
        return value;
    }

}

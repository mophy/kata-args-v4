import { ArgumentType } from './argument-type';

export class BooleanArgumentType extends ArgumentType {

    static default() {
        return false;
    }

    static convert() {
        return true;
    }

    static needValue() {
        return false;
    }

}

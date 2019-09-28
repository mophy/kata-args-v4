import { ListArgumentType } from './list-argument-type';
import { StringArgumentType } from './string-argument-type';

export class StringListArgumentType extends ListArgumentType {

    static itemClass() {
        return StringArgumentType;
    }

}

import { ListArgumentType } from './list-argument-type';
import { IntegerArgumentType } from './integer-argument-type';

export class IntegerListArgumentType extends ListArgumentType {

    static itemClass() {
        return IntegerArgumentType;
    }

}

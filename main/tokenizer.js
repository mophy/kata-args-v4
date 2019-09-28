import { unexpectedValueError, valueNotSpecifiedError } from './errors';

export class Tokenizer {

    constructor(commandLine) {
        this.tokens = commandLine.split(' ').filter(t => t.length);
    }

    hasMore() {
        return this.tokens.length > 0;
    }

    nextFlag() {
        let token = this.tokens.shift();
        if (!token.startsWith('-')) unexpectedValueError(token);
        return token.substring(1);
    }

    nextValue(flag) {
        if (!this.tokens.length) valueNotSpecifiedError(flag);
        return this.tokens.shift();
    }

}

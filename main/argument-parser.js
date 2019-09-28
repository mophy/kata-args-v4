import { Arguments } from './arguments';
import { Argument } from './argument';
import { Tokenizer } from './tokenizer';
import { Schemas } from './schemas';

export class ArgumentParser {

    constructor(schemas) {
        this.schemas = new Schemas(schemas);
    }

    parse(commandLine) {
        this.createDefaultArguments();
        this.tokenizeCommandLine(commandLine);
        this.parseTokens();
        return this.args;
    }

    createDefaultArguments() {
        this.args = new Arguments(this.schemas.map(this.createArgument));
    }

    createArgument(schema) {
        return new Argument(schema.flag, schema.type.default());
    }

    tokenizeCommandLine(commandLine) {
        this.tokens = new Tokenizer(commandLine);
    }

    parseTokens() {
        while (this.tokens.hasMore()) this.parseToken();
    }

    parseToken() {
        let flag = this.tokens.nextFlag();
        let schema = this.schemas.find(flag);
        let value = this.nextValue(schema.type, flag);
        this.args.set(flag, value);
    }

    nextValue(type, flag) {
        let value = type.needValue() ? this.tokens.nextValue(flag) : undefined;
        return type.convert(value, flag);
    }

}

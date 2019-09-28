import { ArgumentParser } from '../main/argument-parser';
import { BooleanSchema, IntegerListSchema, IntegerSchema, StringListSchema, StringSchema } from '../main/schema';

function testParsingSuccess(commandLine, params) {
    let schemas = params.map(param => param.type(param.flag));
    let parser = new ArgumentParser(schemas);

    let result = parser.parse(commandLine);

    params.forEach((param) => {
        let { flag, value } = param;
        expect(result.get(flag)).toEqual(value);
    });
}

function testParsingError(commandLine, schemas, error) {
    let parser = new ArgumentParser(schemas);

    expect(() => parser.parse(commandLine)).toThrow(error);
}

describe('ArgumentParser', () => {

    describe('处理默认参数', () => {

        it('处理布尔型参数的默认值', () => {
            testParsingSuccess('', [
                { type: BooleanSchema, flag: 'd', value: false },
            ]);
        });

        it('处理字符串型参数的默认值', () => {
            testParsingSuccess('', [
                { type: StringSchema, flag: 'l', value: '' },
            ]);
        });

        it('处理整数型参数的默认值', () => {
            testParsingSuccess('', [
                { type: IntegerSchema, flag: 'p', value: 0 },
            ]);
        });

        it('处理字符串型列表参数的默认值', () => {
            testParsingSuccess('', [
                { type: StringListSchema, flag: 's', value: [] },
            ]);
        });

        it('处理整数型列表参数的默认值', () => {
            testParsingSuccess('', [
                { type: IntegerListSchema, flag: 'i', value: [] },
            ]);
        });

    });

    describe('处理 1 个参数', () => {

        it('处理布尔型参数', () => {
            testParsingSuccess('-d', [
                { type: BooleanSchema, flag: 'd', value: true },
            ]);
        });

        it('处理字符串型参数', () => {
            testParsingSuccess('-l /usr/logs', [
                { type: StringSchema, flag: 'l', value: '/usr/logs' },
            ]);
        });

        it('处理整数型参数', () => {
            testParsingSuccess('-p 8080', [
                { type: IntegerSchema, flag: 'p', value: 8080 },
            ]);
        });

    });

    describe('处理 2 个参数', () => {

        it('处理 2 个整数型的参数', () => {
            testParsingSuccess('-p 8080 -q 9527', [
                { type: IntegerSchema, flag: 'p', value: 8080 },
                { type: IntegerSchema, flag: 'q', value: 9527 },
            ]);
        });

        it('处理 2 个布尔型的参数', () => {
            testParsingSuccess('-d -e', [
                { type: BooleanSchema, flag: 'd', value: true },
                { type: BooleanSchema, flag: 'e', value: true },
            ]);
        });

        it('处理 1 个整型和 1 个布尔型的参数', () => {
            testParsingSuccess('-p 8080 -d', [
                { type: IntegerSchema, flag: 'p', value: 8080 },
                { type: BooleanSchema, flag: 'd', value: true },
            ]);
        });

        it('处理 1 个布尔型和 1 个整型的参数', () => {
            testParsingSuccess('-d -p 8080', [
                { type: BooleanSchema, flag: 'd', value: true },
                { type: IntegerSchema, flag: 'p', value: 8080 },
            ]);
        });

    });

    describe('处理 3 个参数', () => {

        it('处理 1 个整型、1 个布尔型和 1 个字符串型参数', () => {
            testParsingSuccess('-p 8080 -d -s /usr/logs', [
                { type: IntegerSchema, flag: 'p', value: 8080 },
                { type: BooleanSchema, flag: 'd', value: true },
                { type: StringSchema, flag: 's', value: '/usr/logs' },
            ]);
        });

        it('处理 1 个负数、1 个字符串型和 1 个布尔型参数', () => {
            testParsingSuccess('-q -9527 -s /usr/logs -d', [
                { type: IntegerSchema, flag: 'q', value: -9527 },
                { type: StringSchema, flag: 's', value: '/usr/logs' },
                { type: BooleanSchema, flag: 'd', value: true },
            ]);
        });

        it('处理 1 个布尔型、1 个字符串型和 1 个未传的整型参数', () => {
            testParsingSuccess('-d -s /usr/logs', [
                { type: IntegerSchema, flag: 'p', value: 0 },
                { type: BooleanSchema, flag: 'd', value: true },
                { type: StringSchema, flag: 's', value: '/usr/logs' },
            ]);
        });

    });

    describe('处理异常情况', () => {

        it('处理规则未定义的情况', () => {
            testParsingError('-b', [
            ], 'Unknown flag: -b');
        });

        it('处理整型参数的值不合法的情况', () => {
            testParsingError('-p 123a', [
                IntegerSchema('p'),
            ], 'Invalid integer of flag -p: 123a');
        });

        it('处理传了多余的值的情况', () => {
            testParsingError('-d hello', [
                BooleanSchema('d'),
            ], 'Unexpected value: hello');
        });

        it('处理字符串型参数没有传值的情况', () => {
            testParsingError('-s', [
                StringSchema('s'),
            ], 'Value not specified of flag -s');
        });

        it('处理整型列表参数数字不合法的问题', () => {
            testParsingError('-i 3,123a,7', [
                IntegerListSchema('i'),
            ], 'Invalid integer of flag -i: 123a');
        });

    });

    describe('处理列表型参数', () => {

        it('处理字符串型列表参数', () => {
            testParsingSuccess('-s how,are,u', [
                { type: StringListSchema, flag: 's', value: ['how', 'are', 'u'] },
            ]);
        });

        it('处理整型列表参数', () => {
            testParsingSuccess('-i 1,-3,2', [
                { type: IntegerListSchema, flag: 'i', value: [1, -3, 2] },
            ]);
        });

    });

});

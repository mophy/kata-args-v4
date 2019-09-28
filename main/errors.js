export function unknownFlagError(flag) {
    throw new Error(`Unknown flag: -${flag}`);
}

export function invalidIntegerError(flag, value) {
    throw new Error(`Invalid integer of flag -${flag}: ${value}`);
}

export function unexpectedValueError(token) {
    throw new Error(`Unexpected value: ${token}`);
}

export function valueNotSpecifiedError(flag) {
    throw new Error(`Value not specified of flag -${flag}`);
}

export const extend = Object.assign;

export function isObject(raw) {
    return raw !== null && typeof raw === 'object';
}

export function isString(raw) {
    return typeof raw === 'string';
}

export function isArray(raw) {
    return Array.isArray(raw);
}
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

export function isOn(funName: string) {
    return /^on[A-Z]/.test(funName);    
}

export function hasOwn(obj: Object, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
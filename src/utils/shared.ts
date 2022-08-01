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

const capitalize = (str: string) => {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}
export const toHandlerKey = (str: string) => {
    return str ? 'on' + capitalize(str) : '';
}
export const camelize = (str: string) => {
    return str.replace(/-(\w)/g, (_, c: string) => {
        return c ? c.toLocaleUpperCase() : c;
    });
}
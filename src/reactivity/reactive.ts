import { mutableHandlers, readonlyHandlers, shallowReadonlyHandelers } from "./baseHandlers";

export function reactive<T = object>(raw: T extends object ? T : object) {
    return new Proxy(raw, mutableHandlers);
}

export function readonly<T = object>(raw: T extends object ? T : object) {
    return new Proxy(raw, readonlyHandlers);
}

export function shallowReadonly<T = object>(raw: T extends object ? T : object) {
    return new Proxy(raw, shallowReadonlyHandelers);
}

export enum ReactiveType {
    IS_REACTIVE = 'v_is_reactive',
    IS_READONLY = 'v_is_readonly'
}


export function isReactive(raw: any) {
    return !!raw[ReactiveType.IS_REACTIVE];
}

export function isReadonly(raw: any) {
    return !!raw[ReactiveType.IS_READONLY];
}

export function isProxy(raw: any) {
    return isReactive(raw) || isReadonly(raw);
}
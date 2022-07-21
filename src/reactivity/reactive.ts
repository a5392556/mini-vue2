import { mutableHandlers, readonlyHandlers } from "./baseHandlers";

export function reactive<T = object>(raw: T extends object ? T : object) {
    return new Proxy(raw, mutableHandlers);
}

export function readonly<T = object>(raw: T extends object ? T : object) {
    return new Proxy(raw, readonlyHandlers);
}
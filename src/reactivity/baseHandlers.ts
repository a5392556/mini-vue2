import { track, trigger } from "./effect";
const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);
export const mutableHandlers = {
    get,
    set
}

export const readonlyHandlers = {
    get: readonlyGet,
    set(target, key, value) {
        console.error(`${target} is readonly!`);
        return true;
    }
}

function createGetter(isReadonly: boolean = false) {
    return function (target, key) {
        const res = Reflect.get(target, key);
        // 收集依赖
        !isReadonly && track(target, key);
        return res;
    }
}
function createSetter() {
    return function (target, key, value) {
        const res = Reflect.set(target, key, value);
        // 触发依赖
        trigger(target, key);
        return res;
    }
}
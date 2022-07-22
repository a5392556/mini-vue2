import { extend, isObject } from "../utils/shared";
import { track, trigger } from "./effect";
import { reactive, ReactiveType, readonly } from "./reactive";
const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);
// 用于 reactive
export const mutableHandlers = {
    get,
    set
}
// 用于 readonly
export const readonlyHandlers = {
    get: readonlyGet,
    set(target, key, value) {
        console.error(`${target} is readonly!`);
        return true;
    }
}
// 用于 shallowReadonly
export const shallowReadonlyHandelers = extend({}, readonlyHandlers, {
    get: createGetter(true, true)
});

function createGetter(isReadonly: boolean = false, shallow: boolean = false) {
    return function (target, key) {
        // 用来 isReactive 和 isReadonly 方法的实现
        if (key === ReactiveType.IS_REACTIVE) {
            return !isReadonly;
        } else if (key === ReactiveType.IS_READONLY) {
            return isReadonly;
        }

        const res = Reflect.get(target, key);
        // 收集依赖
        !isReadonly && track(target, key);
        return !shallow && isObject(res)
            ? isReadonly
                ? readonly(res)
                : reactive(res)
            : res;
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
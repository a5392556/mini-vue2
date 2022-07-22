import { handleChange } from ".";
import { isObject } from "../utils/shared";
import { isTracking, ReactiveEffect, trackEffect, triggerEffect } from "./effect";
import { reactive } from "./reactive";

export function ref<T>(value: T) {
    return new Ref<T>(value);
}

class Ref<T> {
    protected _value: T;
    protected dep: Set<ReactiveEffect>
    protected _rawValue: T;
    public isRef: boolean;

    constructor(value: T) {
        this._rawValue = value;
        this.isRef = true;
        this._value = convert(value);
        this.dep = new Set<ReactiveEffect>();
    }

    get value() {
        // 收集依赖
        trackRefValue(this);
        return this._value;
    }

    set value(newValue: T) {
        // 比对一下, 新旧值一样就不更新
        if(handleChange(this._rawValue, newValue)) {
            this._value = convert(newValue);
            this._rawValue = newValue;
        }
        // 触发依赖
        triggerEffect(this.dep);
    }
}
// 实现如果是 object, 则用 reactive
function convert(value) {
    return isObject(value) ? reactive(value) : value;
}

function trackRefValue(ref) {
    if(isTracking()) {
        trackEffect(ref.dep);
    }
}

export function isRef(ref: any) {
    return !!ref.isRef; 
}

export function unRef(raw: any) {
    return isRef(raw) ? raw.value : raw;
}

export function proxyRefs(raw: any) {
    return new Proxy(raw, {
        get(target, key) {
           return unRef(Reflect.get(target, key));
        },
        set(target, key, value) {
            // 如果旧属性是 Ref, 则维持 Ref 类型, 不是的话直接覆盖
            if(isRef(target[key]) && !isRef(value)) {
                return target[key].value = value;
            }
            return Reflect.set(target, key, value);;
        }
    });
}




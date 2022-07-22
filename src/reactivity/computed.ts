import { ReactiveEffect } from "./effect";

class ComputedImle {
    protected _getter: Function;
    protected _durty: boolean;
    protected _effect: ReactiveEffect;
    protected _value: any;
    constructor(getter: Function) {
        this._getter = getter;
        this._durty = true;
        this._effect = new ReactiveEffect(getter, {
            scheduler: () => {
                !this._durty && (this._durty = true);
            }
        });
    }

    get value() {
        if (this._durty) {
            this._value = this._effect.run();
            this._durty = false;
        }
        return this._value;
    }
}
export function computed(fn: Function) {
    return new ComputedImle(fn);
}
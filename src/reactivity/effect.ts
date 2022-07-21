import { extend } from "../utils/shared";

// 当前的 effect 实例
let currentEffect: ReactiveEffect | undefined = undefined;
// 事件依赖收集总和
const trackMaps = new WeakMap<Object, Map<string | symbol, Set<ReactiveEffect> > >();
/**
 * 依赖收集函数
 * @param fn 
 * @param options 
 * @returns 
 */
export function effect(fn: Function, options?: EffectOptionsType) {
    const _effect = new ReactiveEffect(fn, options);
    _effect.run();
    const runnner: any = _effect.run.bind(_effect);
    // 反向收集，为了后面实现 stop 方法清空 effect
    runnner.effect = _effect;
    return runnner;
}

/**
 * @explain
 * 1.trackMaps 收集 target 对应的 Map (trackTarget) 
 * 2.利用改 trackTarget 收集 key 对应的 Set (dep)
 * 3.用 dep 收集 currentEffect
 * @param target 
 * @param key 
 */
export function track(target: any, key: string | symbol) {
    let trackTarget = trackMaps.get(target);
    if (!trackTarget) {
        trackTarget = new Map<string | symbol, Set<ReactiveEffect>>();
        trackMaps.set(target, trackTarget);
    }
    let dep = trackTarget.get(key);
    if (!dep) {
        dep = new Set<ReactiveEffect>();
        trackTarget.set(key, dep);
    }
    if (currentEffect) {
        !dep.has(currentEffect) && dep.add(currentEffect);
        // 反向收集 dep, 此作用是这 stop 的时候能删掉 dep 中对应的 effect
        if (!currentEffect.deps.some(cdep => cdep === dep)) {
            currentEffect.deps.push(dep);
        }
    }
}
/**
 * @explain
 * 1.用 target 查找 trackMaps 对应的 Map (triggerTarget)
 * 2.用 key 查找 triggerTarget 下对应的 Set (dep)
 * 3.遍历 dep 中的 ReactiveEffect 实例，执行 ReactiveEffect.run
 * @param target 
 * @param key 
 */
export function trigger(target: Object, key: string | symbol) {
    const triggerTarget = trackMaps.get(target);
    if (triggerTarget) {
        const dep = triggerTarget.get(key);
        dep?.forEach(effect => {
            // 如果 scheduler 存在优先执行 scheduler
            effect.scheduler ? effect.scheduler() : effect.run();
        });
    }
}
// 删除依赖
export function stop(runner) {
    (runner.effect as ReactiveEffect).stop();
}

class ReactiveEffect {
    protected _fn: Function;
    public scheduler: Function | undefined;
    public onStop: Function | undefined;
    public deps: Set<ReactiveEffect>[];
    protected avtive: boolean;
    constructor(fn: Function, options?: EffectOptionsType) {
        this._fn = fn;
        // this.scheduler = options?.scheduler;
        // this.onStop = options?.onStop;
        // 将 options 里对应的方法给该对象
        extend(this, options);
        this.deps = [];
        this.avtive = true;
    }
    public run() {
        currentEffect = this;
        return this._fn();
    }
    public stop() {
        if(this.avtive) {
            // 删除对应的依赖
            clearupEffect(this);
            this.onStop && this.onStop();
            this.avtive = false;
        }
    }
}
// 删除对应的依赖
function clearupEffect(effect:ReactiveEffect) {
    effect.deps.forEach(dep => dep.delete(effect));
}


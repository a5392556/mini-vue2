import { hasOwn } from "../utils/shared";

export const CompPublicInstanceHandlers = {
    get({_: instance}, key) {
        const {
            setupState,
            props
        } = instance;

        if(hasOwn(setupState, key)) return setupState[key];
        else if(hasOwn(props, key)) return props[key];
        // $el, $data 等属性的获取
        const publicGetter = publicProperties[key];
        return publicGetter ? publicGetter(instance) : undefined;
    }
}



const publicProperties = {
    $el: i => i.vnode.el 
}
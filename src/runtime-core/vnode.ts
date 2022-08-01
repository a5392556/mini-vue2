import { isArray, isString } from "../utils/shared";
import { ShapeFlags } from "../utils/ShapeFlags";
export function createVNode(type: VNodeConfigType, props?, children?) {
    const vnode: VNodeType = {
        type,
        props,
        children,
        el: null,
        shapeFlag: getShapeFlag(type)
    };

    if(isString(children)) vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;
    else if(isArray(children)) vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN;

    return vnode;
}

function getShapeFlag(type) {
    return typeof type === 'string' ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT;
}

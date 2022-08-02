import { isArray, isObject, isString } from "../utils/shared";
import { ShapeFlags } from "../utils/ShapeFlags";
import { TextNode } from "./constant";
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

    if(vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT && isObject(children)) {
        vnode.shapeFlag |= ShapeFlags.SLOT_CHILDREN;
    }

    return vnode;
}
// 创建一个文本节点
export function createTextVNode(text: string) {
    return createVNode(TextNode, {}, text);
}

function getShapeFlag(type) {
    return typeof type === 'string' ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT;
}

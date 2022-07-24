

export function createVNode(type: any, props?, children?) {
    const vnode: VNodeType = {
        type,
        props,
        children
    };
    return vnode;
}
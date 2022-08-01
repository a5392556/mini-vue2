declare type ComponentType = {
    vnode: VNodeType,
    type: any,
    setupState: object,
    render: Function,
    proxy: Proxy,
    props: Object,
    emit: Function
}
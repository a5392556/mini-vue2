declare type  VNodeType = {
    type: VNodeConfigType,
    props?: any,
    children?: any,
    el?: HTMLElement | null,
    shapeFlag: ShapeFlags
}

declare type VNodeConfigType = keyof HTMLElementTagNameMap | RootTemplateType;

declare type RootTemplateType = {
    setup: Function,
    render: Function
}

declare enum ShapeFlags {
    ELEMENT = 1,
    STATEFUL_COMPONENT = 1 << 1,
    TEXT_CHILDREN = 1 << 2,
    ARRAY_CHILDREN = 1 << 3
}
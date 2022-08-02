declare type  VNodeType = {
    type: VNodeConfigType,
    props?: any,
    children?: any,
    el?: HTMLElement | null,
    shapeFlag: ShapeFlags
}
declare type VNodeConfigType = keyof HTMLElementTagNameMap | RootTemplateType | Symbol;

declare type RootTemplateType = {
    setup: Function,
    render: Function
}

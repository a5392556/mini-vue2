import { cerateComponentInstace, setupComponent } from "./component";
import { ShapeFlags } from "../utils/ShapeFlags";
import { isOn } from "../utils/shared";
export function render(vnode: VNodeType, container: HTMLElement) {
    patch(vnode, container);
}
function patch(vnode: VNodeType, container: HTMLElement) {
    // 通过 vnode 的 type 来分别处理
    if (ShapeFlags.STATEFUL_COMPONENT & vnode.shapeFlag) {
        processComponent(vnode, container);
    } else if (ShapeFlags.ELEMENT & vnode.shapeFlag) {
        processElement(vnode, container);
    }
}
// 处理 component
function processComponent(vnode: VNodeType, container: HTMLElement) {
    mountComponent(vnode, container);
}
// 挂载 component
function mountComponent(vnode: VNodeType, container: HTMLElement) {
    const instance = cerateComponentInstace(vnode);
    // 初始化组件状态
    setupComponent(instance);
    setupRenderEffect(instance, vnode, container);
}
// 挂载 element
function processElement(vnode: VNodeType, container: HTMLElement) {
    mountElement(vnode, container);
}

// 挂载元素
function mountElement(vnode: VNodeType, container: HTMLElement) {
    const {
        type, props
    } = vnode;
    const el = vnode.el = document.createElement(type as keyof HTMLElementTagNameMap);
    for (const key in props) {
        if(isOn(key)) {
            el.addEventListener(key.slice(2).toLowerCase(), props[key]);
        }   
        else el.setAttribute(key, props[key]);
    }
    mountChildren(vnode, el);
    container.appendChild(el);
}
// 挂载 children
function mountChildren(vnode: VNodeType, el: HTMLElement) {
    const {
        children
    } = vnode;
    if (vnode.shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        el.textContent = children;
    } else if (vnode.shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        children.forEach(v => {
            patch(v, el);
        });
    }
}
// 创建完 component 后执行
function setupRenderEffect(instance: ComponentType, vnode: VNodeType, container: HTMLElement) {
    const subTree = instance.render.call(instance.proxy);
    if (subTree) {
        patch(subTree, container);
    }
    vnode.el = subTree.el;

}




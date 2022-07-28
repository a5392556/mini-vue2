import { isArray, isObject, isString } from "../utils/shared";
import { cerateComponentInstace, setupComponent } from "./component";

export function render(vnode: VNodeType, container: HTMLElement) {
    patch(vnode, container);
}
function patch(vnode: VNodeType, container: HTMLElement) {
    const {
        type
    } = vnode;
    // 通过 vnode 的 type 来分别处理
    if(isObject(type)) {
        processComponent(vnode, container);
    }else if(isString(type)) {
        processElement(vnode, container);
    }
}
// 挂载 component
function processComponent(vnode: VNodeType, container: HTMLElement) {
    mountComponent(vnode, container);
}

function mountComponent(vnode: VNodeType, container: HTMLElement) {
    const instance = cerateComponentInstace(vnode);
    // 初始化组件状态
    setupComponent(instance);
    console.log(instance);
    setupRenderEffect(instance, container);
}
// 挂载 element
function processElement(vnode: VNodeType, container: HTMLElement) {
    mountElement(vnode, container);
}

function mountElement(vnode: VNodeType, container: HTMLElement) {
    const {
        type, props, children
    } = vnode;
    const el = document.createElement(type);
    for (const key in props) {
        el.setAttribute(key, props[key]);
    }
    mountChildren(children, el);
    container.appendChild(el);

}
// 挂载 children
function mountChildren(children: any, el: HTMLElement) {
    if (isString(children)) {
        el.textContent = children;
    } else if (isArray(children)) {
        children.forEach(v => {
            patch(v, el);
        });
    }
}
// 创建完 component 后执行
function setupRenderEffect(instance: ComponentType, container: HTMLElement) {
    const subTree = instance.render();
    if(subTree) {
        patch(subTree, container);
    }
}




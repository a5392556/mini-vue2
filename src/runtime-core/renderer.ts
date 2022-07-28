import { isArray, isObject, isString } from "../utils/shared";
import { cerateComponentInstace, setupComponent } from "./component";

export function render(vnode: VNodeType, container: HTMLElement) {
    patch(vnode, container);
}
function patch(vnode: VNodeType, container: HTMLElement) {
    const {
        type
    } = vnode;
    if(isObject(type)) {
        processComponent(vnode, container);
    }else if(isString(type)) {
        processElement(vnode, container);
    }
}

function processComponent(vnode: VNodeType, container: HTMLElement) {
    mountComponent(vnode, container);
}

function mountComponent(vnode: VNodeType, container: HTMLElement) {
    const instance = cerateComponentInstace(vnode);
    // 初始化组件状态
    setupComponent(instance);
    setupRenderEffect(instance, container);
}

function setupRenderEffect(instance: ComponentType, container: HTMLElement) {
    const subTree = instance.render();
    if(subTree) {
        patch(subTree, container);
    }
}

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

function mountChildren(children: any, el: HTMLElement) {
    if (isString(children)) {
        el.textContent = children;
    } else if (isArray(children)) {
        children.forEach(v => {
            patch(v, el);
        });
    }
}


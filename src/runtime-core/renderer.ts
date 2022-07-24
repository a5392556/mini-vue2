import { cerateComponentInstace, setupComponent } from "./component";

export function render(vnode: VNodeType, container: any) {
    patch(vnode, container);
}
function patch(vnode: VNodeType, container: HTMLElement) {
    processComponent(vnode, container);
}

function processComponent(vnode: VNodeType, container: HTMLElement) {
    mountComponent(vnode, container);
}

function mountComponent(vnode: VNodeType, container: HTMLElement) {
    const instance = cerateComponentInstace(vnode);
    setupComponent(instance);
    setupRenderEffect(instance, container);
}

function setupRenderEffect(instance: ComponentType, container: HTMLElement) {
    const subTree = instance.render();
    if(subTree) {
        patch(subTree, container);
    }
}


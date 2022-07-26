import { render } from "./renderer";
import { createVNode } from "./vnode"

export function createApp(rootComponent: RootTemplateType) {
    return {
        mount(rootContainer: HTMLElement) {
            const vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        }
    }
}


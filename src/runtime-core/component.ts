import { shallowReadonly } from "../reactivity/reactive";
import { emit } from "./componentEmit";
import { initProps } from "./componentProps";
import { CompPublicInstanceHandlers } from "./componentPublicInstance";

export function cerateComponentInstace(vnode: VNodeType) {
    const componentInstace: ComponentType = {
        vnode,
        type: vnode.type,
        setupState: {},
        render: () => {},
        proxy: null,
        props: {},
        emit: () => {}
    };
    componentInstace.emit = emit.bind(null, componentInstace);
    return componentInstace;
}

export function setupComponent(instance: ComponentType) {
    initProps(instance, instance.vnode.props);
    // initSlots();
    // 初始化一个有状态的 component
    setupStatefulComponent(instance);
}
// 处理用户定义中的 setup 函数
function setupStatefulComponent(instance: ComponentType) {
    const {
        type: component,
        props
    } = instance;
    instance.proxy = new Proxy({_: instance}, CompPublicInstanceHandlers);
    const { setup } = component;
    if (setup) {
        const setupResult = setup(shallowReadonly(props), {
            emit: instance.emit
        });
        // 判断这个结果是 object 还是 function
        handleSetupResult(instance, setupResult);
    }
}
// 用来处理 setup 结果
function handleSetupResult(instance: ComponentType, setupResult: Function | object) {
    if(typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    
    finishComponentSetup(instance);
}
// 完成组件的 setup
function finishComponentSetup(instance: ComponentType) {
    const instace = instance.type;
    // 这里当组件初始化时 component 还是用户定义的 template
    if(instace.render) {
        instance.render = instace.render;
    }
}


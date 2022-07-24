export function cerateComponentInstace(vnode: VNodeType) {
    const component: ComponentType = {
        vnode,
        type: vnode.type,
        setupState: {},
        render: () => {}
    };
    return component;
}

export function setupComponent(instance: ComponentType) {
    // initProps();
    // initSlots();
    // 初始化一个有状态的 component
    setupStatefulComponent(instance);
}
// 处理用户定义中的 setup 函数
function setupStatefulComponent(instance: ComponentType) {
    const component = instance.type;
    const { setup } = component;
    if (setup) {
        const setupResult = setup();
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

function finishComponentSetup(instance: ComponentType) {
    const component = instance.type;
    if(component.render) {
        instance.render = component.render;
    }
}


function cerateComponentInstace(vnode) {
    var component = {
        vnode: vnode,
        type: vnode.type,
        setupState: {},
        render: function () { }
    };
    return component;
}
function setupComponent(instance) {
    // initProps();
    // initSlots();
    // 初始化一个有状态的 component
    setupStatefulComponent(instance);
}
// 处理用户定义中的 setup 函数
function setupStatefulComponent(instance) {
    var component = instance.type;
    var setup = component.setup;
    if (setup) {
        var setupResult = setup();
        // 判断这个结果是 object 还是 function
        handleSetupResult(instance, setupResult);
    }
}
// 用来处理 setup 结果
function handleSetupResult(instance, setupResult) {
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    var component = instance.type;
    if (component.render) {
        instance.render = component.render;
    }
}

function render(vnode, container) {
    patch(vnode);
}
function patch(vnode, container) {
    processComponent(vnode);
}
function processComponent(vnode, container) {
    mountComponent(vnode);
}
function mountComponent(vnode, container) {
    var instance = cerateComponentInstace(vnode);
    setupComponent(instance);
    setupRenderEffect(instance);
}
function setupRenderEffect(instance, container) {
    var subTree = instance.render();
    if (subTree) {
        patch(subTree);
    }
}

function createVNode(type, props, children) {
    var vnode = {
        type: type,
        props: props,
        children: children
    };
    return vnode;
}

function createApp(rootComponent) {
    return {
        mount: function (rootContainer) {
            var vnode = createVNode(rootComponent);
            render(vnode);
        }
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

export { createApp, h };

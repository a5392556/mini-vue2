function isObject(raw) {
    return raw !== null && typeof raw === 'object';
}
function isString(raw) {
    return typeof raw === 'string';
}
function isArray(raw) {
    return Array.isArray(raw);
}

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
// 完成组件的 setup
function finishComponentSetup(instance) {
    var component = instance.type;
    if (component.render) {
        instance.render = component.render;
    }
}

function render(vnode, container) {
    patch(vnode, container);
}
function patch(vnode, container) {
    var type = vnode.type;
    if (isObject(type)) {
        processComponent(vnode, container);
    }
    else if (isString(type)) {
        processElement(vnode, container);
    }
}
function processComponent(vnode, container) {
    mountComponent(vnode, container);
}
function mountComponent(vnode, container) {
    var instance = cerateComponentInstace(vnode);
    // 初始化组件状态
    setupComponent(instance);
    setupRenderEffect(instance, container);
}
function setupRenderEffect(instance, container) {
    var subTree = instance.render();
    if (subTree) {
        patch(subTree, container);
    }
}
function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    var type = vnode.type, props = vnode.props, children = vnode.children;
    var el = document.createElement(type);
    for (var key in props) {
        el.setAttribute(key, props[key]);
    }
    mountChildren(children, el);
    container.appendChild(el);
}
function mountChildren(children, el) {
    if (isString(children)) {
        el.textContent = children;
    }
    else if (isArray(children)) {
        children.forEach(function (v) {
            patch(v, el);
        });
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
            render(vnode, rootContainer);
        }
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

export { createApp, h };

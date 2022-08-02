import {h, createTextVNode} from '../../libs/guide-mini-vue.esm.js';
import Foo from './Foo.js';
export default {
    render() {
        const app = h('div', {}, 'app');
        const foo = h(Foo, {}, {'header':({age}) => [h('p', {}, String(age)), createTextVNode('你好呀')], 'footer': () => h('p', {}, '456')});
        // const foo = h(Foo, {}, h('p', {}, '123'));
        return h('div',{id:'root'},[app, foo]);
    },
    setup() {}
}
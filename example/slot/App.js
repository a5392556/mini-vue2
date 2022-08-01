import {h} from '../../libs/guide-mini-vue.esm.js';
import Foo from './Foo.js';
export default {
    render() {
        const app = h('div', {}, 'app');
        const foo = h(Foo, {}, h('p', {}, '123'));
        return h('div',{id:'root'},[app, foo]);
    },
    setup() {

    }
}
import {h} from '../../libs/guide-mini-vue.esm.js';
import Foo from './Foo.js';
export default {
    render() {
        window.self = this;
        return h('div',{id:'root'},[ 'hi, ' + this.msg, h(Foo, {
            onAdd(a, b) {
                console.log('onAdd', a, b);
            },
            onAddFoo() {
                console.log('on-add-foo');
            }
        })]);
        // return   h('button', {class: 'red', onClick: () => {console.log(111)}}, this.msg );
    },
    setup() {
        return {
            msg: 'mini-vue'
        }
    }
}
import {h} from '../../lib/guide-mini-vue.esm.js';
export default {
    render() {
        return h('div',{id:'root'},[ 'hi, ' + 'mini-vue', h('p', {class: 'red'}, 'red'),  h('p', {class: 'blue'}, 'red')]);
    },
    setup() {
        return {
            msg: 'mini-vue'
        }
    }
}
import {h} from '../../libs/guide-mini-vue.esm.js';
export default {
    render() {
        // window.self = this;
        // return h('div',{id:'root'},[ 'hi, ' + this.msg, h('p', {class: 'red'}, 'red'),  h('p', {class: 'blue'}, 'red')]);
        return h('div', {}, 'foo:' + this.count);
    },
    setup(props) {
        props.count++;
        return {
            msg: 'mini-vue'
        }
    }
}
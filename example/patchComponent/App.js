import {h} from '../../libs/guide-mini-vue.esm.js';
export default {
    render() {
        window.self = this;
        // return h('div',{id:'root'},[ 'hi, ' + this.msg, h('p', {class: 'red'}, 'red'),  h('p', {class: 'blue'}, 'red')]);
        return   h('button', {class: 'red', onClick: () => {console.log(111)}}, this.msg );
    },
    setup() {
        return {
            msg: 'mini-vue'
        }
    }
}
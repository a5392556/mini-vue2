import {h} from '../../lib/guide-mini-vue.esm.js';
export default {
    render() {
        return h('div', 'hi, ' + this.msg);
    },
    setup() {
        return {
            msg: 'mini-vue'
        }
    }
}
import { h } from '../../libs/guide-mini-vue.esm.js';
export default {
    render () {
        const foo = h('p', {}, 'foo');
        return h('div', {}, [foo]);
    },
    setup (props, { emit }) {

    }
}
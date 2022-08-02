import { h, renderSlots } from '../../libs/guide-mini-vue.esm.js';
export default {
    render () {
        const age = 122;
        const foo = h('p', {}, 'foo');
        return h('div', {}, [renderSlots(this.$slots, 'header', {age}), foo, renderSlots(this.$slots, 'footer')]);
    },
    setup (props, { emit }) {

    }
}
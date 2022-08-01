import {h} from '../../libs/guide-mini-vue.esm.js';
export default {
    render() {
        const btn = h(
            'button',
            {
                onClick: this.emitAdd
            },
            'emitAdd'
        );
        const foo = h('p', {}, 'Foo');
        return h('div', {}, [foo, btn]);
    },
    setup(props, {emit}) {
        const emitAdd = () => {
            console.log('emit add');
            emit('add');
        }
        return {
            msg: 'mini-vue',
            emitAdd
        }
    }
}
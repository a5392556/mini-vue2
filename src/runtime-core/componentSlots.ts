import { ShapeFlags } from "../utils/ShapeFlags";

export function initSlots(instance: ComponentType, children: any) {
    // 如果组件有插槽则进行处理
    if(instance.vnode.shapeFlag & ShapeFlags.SLOT_CHILDREN) 
        normalizeObjectSlots(instance.slots, children);
}

function normalizeObjectSlots(slots: Object, children: Object) {
    for(const key in children) {
        const slot = children[key];
        slots[key] = (props) => normalizeSlotValue(slot(props));
    }
}

function normalizeSlotValue(val) {
    return  Array.isArray( val ) ? val : [val];
}
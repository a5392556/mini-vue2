import { isProxy, isReactive, reactive } from "../reactive";

describe('reactive', () => {
    it('happy path', () => {
        const obj = {age: 1};
        const foo = reactive(obj);
        expect(obj).not.toBe(foo);
        // expect(foo.age).toBe(obj.age);
    });

    it('is reactive', () => {
        const obj = {age: 1};
        const foo = reactive(obj);
        expect(isReactive(foo)).toBe(true);
        expect(isReactive(obj)).toBe(false);
    });

    it('nested reactive', () => {
        const orignal = reactive({
            nested: {
                foo: 1
            },
            array: [{bar: 2}]
        });
        const k = {foo: 0};
        expect(isReactive(orignal)).toBe(true);
        expect(isReactive(orignal.nested)).toBe(true);
        expect(isReactive(orignal.array[0])).toBe(true);
        expect(isProxy(orignal)).toBe(true);
        expect(isProxy(k)).toBe(false);
    });
});

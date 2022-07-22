import { isReadonly, shallowReadonly } from "../reactive";

describe('shallow readonly', () => {
    it('happy path', () => {
        const orignal = shallowReadonly({
            nested: {
                foo: 1
            },
            array: [{bar: 2}]
        });
        expect(isReadonly(orignal)).toBe(true);
        expect(isReadonly(orignal.nested)).toBe(false);
        expect(isReadonly(orignal.array[0])).toBe(false);

    });
});
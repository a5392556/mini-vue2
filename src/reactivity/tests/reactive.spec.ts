import { reactive } from "../reactive";

describe('reactive', () => {
    it('happy path', () => {
        const obj = {age: 1};
        const foo = reactive(obj);
        expect(obj).not.toBe(foo);
        // expect(foo.age).toBe(obj.age);
    });
})
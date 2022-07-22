import { effect } from "../effect";
import { isRef, proxyRefs, ref, unRef } from "../ref";

describe('ref', () => {
    it('happy path', () => {
        const a = ref(1);
        expect(a.value).toBe(1);
    });

    it('effect', () => {
        let dumy;
        const k = ref(1);
        effect(() => {
            dumy = k.value;
        });
        expect(dumy).toBe(1);
        k.value++;
        expect(k.value).toBe(2);
        expect(dumy).toBe(2);
    });

    it('ref and reactive', () => {
        const a = ref({foo: 1});
        let dumy;
        effect(() => {
            dumy = a.value.foo;
        });
        expect(dumy).toBe(1);
        a.value.foo = 2;
        expect(dumy).toBe(2);
    });

    it('isRef and unRef', () => {
        const obj = {foo: 0};
        const r = ref(obj);
        const k = ref(1);
        expect(isRef(r)).toBe(true);
        expect(isRef(obj)).toBe(false);
        expect(unRef(k)).toBe(1);

    });

    it('proxy ref', () => {
        const obj = {
            foo: 1,
            age: ref(10)
        };
        const res = proxyRefs(obj);
        expect(obj.age.value).toBe(10);
        expect(res.foo).toBe(1);
        expect(res.age).toBe(10);
        res.age = 20;
        expect(obj.age.value).toBe(20);
        expect(res.age).toBe(20);

        res.age = ref(10);
        expect(obj.age.value).toBe(10);
        expect(res.age).toBe(10);
    });
});


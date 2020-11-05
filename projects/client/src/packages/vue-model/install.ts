import Vue, { VueConstructor } from 'vue';

let  _Vue: VueConstructor;

export function defineReactive(obj: object, key: string, val?: any, customSetter?: (val?: any) => void, shallow?: boolean) {
    // @ts-ignore
    return _Vue.util.defineReactive(obj, key, val, customSetter, shallow);
}

export function createOldVueModel(options: object) {
    return new _Vue(options);
}

export default function install(VueLibrary: VueConstructor) {
    _Vue = VueLibrary;
    VueLibrary.mixin({
        
        async beforeCreate() {
            // @ts-ignore
            const store = this.$root.$options.store
            // @ts-ignore
            || this.$options.store
            // @ts-ignore
            || this.$store;
            const models = this.$options.models;
            if (!models || !store) {
                return;
            }
            Object.keys(models).forEach((key) => {
                const modelCtor = models[key];
                // @ts-ignore
                const storeModelInstance = store.registerModel(modelCtor);
                if (!storeModelInstance.count) {
                    const instance = new storeModelInstance.constructor(this.$root, store);
                    instance.init();
                    storeModelInstance.instance = instance;
                }
                // @ts-ignore
                storeModelInstance.count++;
                if (key in this) {
                    throw new Error(`There has a duplex name ${key} on ${this.$vnode.tag}`);
                }

                Object.defineProperty(this, key, {
                    get: () => storeModelInstance.instance,
                    configurable: true,
                });
            });
            await this.$nextTick();
        },
        beforeDestroy(this: Vue) {
          // @ts-ignore
            const store = this.$root.$options.store;
            const models = this.$options.models;
            if (!models || !store) {
                return;
            }
            Object.keys(models).forEach((key) => {
                const modelCtor = models[key];
                // @ts-ignore
                const storeModelInstance = store.getModelInstance(modelCtor);
                // @ts-ignore
                storeModelInstance.count--;
                if (storeModelInstance.count === 0) {
                    storeModelInstance.instance.destory();
                    storeModelInstance.instance = null;
                }
                Object.defineProperty(this, key, {
                    get: () => null,
                    configurable: true,
                });
            });
        }
    });
}
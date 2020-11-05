import Store from './store';
import { BaseModel } from './model';

export interface storeModelInstance<T> {
    constructor: T;
    instance: T | null;
    count: Number;
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        models?: any;
        // store?: Store;
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        // $store?: Store;
    }

    interface VueConstructor {
        util: {
            defineReactive: (
                obj: object,
                key: string,
                val?: any,
                customSetter?: (val?: any) => void,
                shallow?: boolean,
            ) => {};
        };
        models?: any[];
    }
}

export type BaseModelConstructor = typeof BaseModel;

export interface ModelMap {
    [key: string]: {
        constructor: BaseModelConstructor;
        instance: BaseModel | Vue;
        count: number;
    }
}
import {storeModelInstance} from './types';
import {BaseModel} from './model';

export default class Store {
    private modelMap = new Map<BaseModel, storeModelInstance<BaseModel>>();

    constructor() {}

    getModelInstance<T extends BaseModel>(constructor: T) {
        return this.modelMap.get(constructor) as storeModelInstance<T>;
    }

    registerModel<T extends BaseModel>(constructor: T) {
        if (this.modelMap.has(constructor)) {
            return this.modelMap.get(constructor) as storeModelInstance<T>;
        }
        const storeModelInstance: storeModelInstance<T> = {
            constructor,
            instance: null,
            count: 0,
        };
        this.modelMap.set(constructor, storeModelInstance);
        return storeModelInstance;
    }
}
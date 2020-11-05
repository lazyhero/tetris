import Vue from 'vue';
import Store from './store';
import { defineReactive } from './install';

const skipProperty = ['models'];

export class BaseModel {
    // @ts-ignore
    protected readonly $vm: Vue;
    // private readonly $store: Store;

    private inited = false;

    [key: string]: any;

    constructor(vm: Vue, store: Store) {
        this.$vm = vm;
        this.$store = store;
    }

    init() {
        if (this.inited) {
            return;
        }
        this.initState();
        this.initDependencyModel();

        this.vm = this.$vm;
        this.inited = true;
    }

    private initState() {
        makeModelReactive(this);
    }

    private initDependencyModel() {
        if(!this.models) {
            return;
        }
        Object.keys(this.models).forEach((key) => {
            Object.defineProperty(this, key, {
                get: () => this.$store.getModelInstance(this.models[key]).instance,
                configurable: true,
            })
        })
    }
}

function makeModelReactive(model: BaseModel) {
    Object.keys(model).forEach(key => {
        if (key.startsWith('$') || key.startsWith('_') || key.endsWith('$') || skipProperty.includes(key)) {
            return;
        }

        const descriptor = Object.getOwnPropertyDescriptor(model, key) || {};

        if (typeof descriptor.value === 'function') {
            return;
        }

        makeObservable(model, key);
    })
}

function makeObservable(model: BaseModel, key: string) {
    let observerListener: any;
    const initialValue = model[key];

    defineReactive(model, key, initialValue, () => {
        Promise.resolve().then(() => {
            if(observerListener) {
                observerListener.next(model[key]);
            }
        });
    })
}
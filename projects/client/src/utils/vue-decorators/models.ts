// TODO any: model type
import {BaseModel} from '@/packages/vue-model';
import {createDecorator, VueDecorator} from 'vue-class-component';

export default function vueModels(modelCtor: typeof BaseModel): VueDecorator {
    return createDecorator((componentOptions, k: string) => {
        componentOptions.models = componentOptions.models || ({} as any);
        componentOptions.models[k] = modelCtor;
    });
}

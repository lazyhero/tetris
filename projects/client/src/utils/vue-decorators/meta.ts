import {createDecorator} from 'vue-class-component';

export const Meta = createDecorator((options: any, key: string) => {
    options.metaInfo = options.methods[key];
});

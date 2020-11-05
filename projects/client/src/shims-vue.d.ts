declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}
declare module 'vue/types/vue' {
  interface Vue {
      $meta: any;
      $router: VueRouter;
      $store: any;
      util: {
        defineReactive: (
            obj: object,
            key: string,
            val?: any,
            customSetter?: (val?: any) => void,
            shallow?: boolean,
        ) => {};
    };
  }
  interface VueConstructor {
      $meta: any;
      $router: VueRouter;
      $store: any;
      util: {
        defineReactive: (
            obj: object,
            key: string,
            val?: any,
            customSetter?: (val?: any) => void,
            shallow?: boolean,
        ) => {};
    };
  }
}